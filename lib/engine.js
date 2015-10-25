"use strict";

var jsonapter = require('jsonapter');
var _ = require('lodash');

var js2xml = require('./js2xml');
var logger = require('./logger');

var classifyObservation = (function () {
    var codeMap = {
        '9279-1': 'Vitals',
        '8867-4': 'Vitals',
        '2710-2': 'Vitals',
        '55284-4': 'Vitals',
        '55418-8': 'Vitals',
        '8480-6': 'Vitals',
        '8462-4': 'Vitals',
        '8310-5': 'Vitals',
        '8302-2': 'Vitals',
        '8306-3': 'Vitals',
        '8287-5': 'Vitals',
        '3141-9': 'Vitals',
        '39156-5': 'Vitals',
        '3140-1': 'Vitals',
        '8716-3': 'Vitals',
        '8284-2': 'Vitals',
        '29463-7': 'Vitals',
        '35094-2': 'Vitals',
        '41909-3': 'Vitals',
        '3139-2': 'Vitals',
        '57251-1': 'Functional'
    };

    var snomedCodeMap = {
        '229819007': 'SocialHistory',
        '160573003': 'SocialHistory'
    };

    return function (resource) {
        var system = _.get(resource, 'code.coding[0].system');
        var code = _.get(resource, 'code.coding[0].code');
        if (system === 'http://loinc.org') {
            var type = codeMap[code];
            if (type) {
                return 'Observation' + type;
            } else {
                return 'ObservationResult';
            }
        } else if (system === 'http://snomed.info/sct') {
            var type2 = snomedCodeMap[code];
            if (type2) {
                return 'Observation' + type2;
            } else {
                return 'ObservationUnknown';
            }
        } else if (code === 'ASSERTION') {
            return 'ObservationSocialHistory';
        } else {
            logger.error('unsupported system for observation %s', system);
        }
        return null;
    };
})();

var updateProcedure = (function () {
    var codeMap = {
        '73761001': 0,
        '274025005': 1
    };
    var categoryValues = [{
        code: "103693007",
        system: 'http://snomed.info/sct'
    }, {
        code: "46947000",
        system: 'http://snomed.info/sct'
    }];

    return function (resource) {
        if (!resource.category) {
            var code = _.get(resource, 'code.coding[0].code', null);
            if (!code) {
                logger.error('no code found for procedure resource %s', resource.id);
            } else {
                var catIndex = codeMap[code];
                if (catIndex !== undefined) {
                    resource.category = {
                        coding: [categoryValues[catIndex]]
                    };
                }
            }
        }
    };

})();

var groupVitals = function (vitalResources) {
    var result = vitalResources.reduce(function (r, v) {
        var key = v.effectiveDateTime;
        var index = r.keys[key];
        if (index === undefined) {
            index = r.groups.length;
            r.groups.push({
                components: []
            });
            r.keys[key] = index;
        }
        r.groups[index].components.push(v);
        return r;
    }, {
        keys: {},
        groups: []
    });
    return result.groups;
};

var toResourceDictionary = exports.toResourceDictionary = function (bundleEntries) {
    var byId = {};
    var byType = {};
    if (bundleEntries) {
        bundleEntries.forEach(function (bundleEntry) {
            var resource = bundleEntry.resource;
            var id = resource.id;
            byId[id] = resource;
            var type = resource.resourceType;
            if (type === 'Observation') {
                type = classifyObservation(resource);
            }
            if (type === 'ProcedureRequest') {
                type = 'planOfCare';
            }
            if (type === 'Procedure') {
                updateProcedure(resource);
            }
            if (type === 'FamilyMemberHistory') {
                type = 'familyHistory';
            }
            if (type === 'ClinicalImpression') {
                type = 'functionalStatus';
            }
            if (type === 'Device') {
                type = 'medicalEquipment';
            }
            if (type !== null) {
                var byTypeEntry = byType[type];
                if (!byTypeEntry) {
                    byType[type] = byTypeEntry = [];
                }
                byTypeEntry.push(resource);
            }
        });
    }
    if (byType.functionalStatus) {
        byType.functionalStatus = byType.functionalStatus.reduce(function (r, resource) {
            var id = _.get(resource, 'investigations[0].item[0].reference', null);
            if (id) {
                var observation = byId[id];
                if (observation) {
                    r.push(observation);
                }
            }
            return r;
        }, []);
    }

    byType.ObservationVitals = groupVitals(byType.ObservationVitals);
    return {
        byId: byId,
        byType: byType
    };
};

var j2jInstance = function (resourceDict) {
    var getById = function (id) {
        var resource = resourceDict.byId[id];
        if ((resource === null) || (resource === undefined)) {
            console.log('Id not found: ' + id);
            return null;
        } else {
            return resource;
        }
    };

    var getByType = function (resourceType) {
        var resources = resourceDict.byType[resourceType];
        if ((resources === null) || (resources === undefined)) {
            return null;
        } else {
            return resources;
        }
    };

    var overrides = {
        context: {
            getById: getById,
            getByType: getByType
        }
    };

    _.extend(overrides, resourceDict);

    var result = jsonapter.instance(overrides);
    return result;
};

exports.generate = function (template, bundle, options) {
    options = options || {};
    var resourceDictionary = toResourceDictionary(bundle.entry);
    var j2j = j2jInstance(resourceDictionary);
    var result = j2j.run(template, resourceDictionary);
    if (!options.json) {
        result = js2xml(result);
    }
    return result;
};
