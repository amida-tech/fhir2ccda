"use strict";

var jsonapter = require('jsonapter');
var _ = require('lodash');

var js2xml = require('./js2xml');
var logger = require('./logger');

var classifyObservation = (function () {
    var codeMap = {
        '9279-1': 'vitalSign',
        '8867-4': 'vitalSign',
        '2710-2': 'vitalSign',
        '55284-4': 'vitalSign',
        '55418-8': 'vitalSign',
        '8480-6': 'vitalSign',
        '8462-4': 'vitalSign',
        '8310-5': 'vitalSign',
        '8302-2': 'vitalSign',
        '8306-3': 'vitalSign',
        '8287-5': 'vitalSign',
        '3141-9': 'vitalSign',
        '39156-5': 'vitalSign',
        '3140-1': 'vitalSign',
        '8716-3': 'vitalSign',
        '8284-2': 'vitalSign',
        '29463-7': 'vitalSign',
        '35094-2': 'vitalSign',
        '41909-3': 'vitalSign',
        '3139-2': 'vitalSign'
    };

    var snomedCodeMap = {
        '229819007': 'socialHistory',
        '160573003': 'socialHistory'
    };

    return function (resource) {
        var system = _.get(resource, 'code.coding[0].system');
        var code = _.get(resource, 'code.coding[0].code');
        if (system === 'http://loinc.org') {
            var type = codeMap[code];
            if (type) {
                return type;
            } else {
                return 'result';
            }
        } else if (system === 'http://snomed.info/sct') {
            var type2 = snomedCodeMap[code];
            if (type2) {
                return type2;
            } else {
                return 'other';
            }
        } else if (code === 'ASSERTION') {
            return 'socialHistory';
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

var toResourceDictionary = exports.toResourceDictionary = (function () {
    var resourceExlusion = {
        Procedure: function (resource) {
            var id = _.get(resource, 'used[0].reference');
            if (id) {
                return [id];
            } else {
                return null;
            }
        },
        ClinicalImpression: function (resource) {
            var id = _.get(resource, 'investigations[0].item[0].reference');
            if (id) {
                return [id];
            } else {
                return null;
            }
        },
        MedicationOrder: function (resource) {
            var id = _.get(resource, 'reasonReference.reference');
            if (id) {
                return [id];
            } else {
                return null;
            }
        }
    };

    var resourceToType = {
        Condition: function () {
            return 'problem';
        },
        AllergyIntolerance: function () {
            return 'allergy';
        },
        FamilyMemberHistory: function () {
            return 'familyHistory';
        },
        Procedure: function (resource) {
            updateProcedure(resource);
            return 'procedure';
        },
        Device: function (resource) {
            return 'medicalEquipment';
        },
        ClinicalImpression: function () {
            return 'functionalStatus';
        },
        ProcedureRequest: function () {
            return 'planOfCare';
        },
        Observation: function (resource) {
            return classifyObservation(resource);
        },
        MedicationAdministration: function () {
            return 'medication';
        },
        Immunization: function () {
            return 'immunization';
        },
        Encounter: function () {
            return 'encounter';
        },
        Claim: function () {
            return 'payer';
        },
        Patient: function () {
            return 'patient';
        }
    };

    return function (bundleEntries) {
        var exclusionIndex = bundleEntries.reduce(function (r, bundleEntry) {
            var resource = bundleEntry.resource;
            var resourceType = resource.resourceType;
            var refn = resourceExlusion[resourceType];
            if (refn) {
                var ids = refn(resource);
                if (ids) {
                    ids.forEach(function (id) {
                        r[id] = true;
                    });
                }
            }
            return r;
        }, {});

        var byId = {};
        var byType = {};
        if (bundleEntries) {
            bundleEntries.forEach(function (bundleEntry) {
                var resource = bundleEntry.resource;
                var id = resource.id;
                if (id.indexOf('/') < 0) {
                    id = resource.resourceType + '/' + id;
                }
                byId[id] = resource;
                if (!exclusionIndex[id]) {
                    var resourceType = resource.resourceType;
                    var typeGen = resourceToType[resourceType];
                    if (typeGen) {
                        var type = typeGen(resource);
                        if (type !== null) {
                            var byTypeEntry = byType[type];
                            if (!byTypeEntry) {
                                byType[type] = byTypeEntry = [];
                            }
                            byTypeEntry.push(resource);
                        }
                    }
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

        if (byType.vitalSign) {
            byType.vitalSign = groupVitals(byType.vitalSign);
        }
        return {
            byId: byId,
            byType: byType
        };
    };
})();

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
