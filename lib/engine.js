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

    return function (resource) {
        var system = _.get(resource, 'code.coding[0].system');
        if (system === 'http://loinc.org') {
            var code = _.get(resource, 'code.coding[0].code');
            var type = codeMap[code];
            if (type) {
                return 'Observation' + type;
            } else {
                return 'ObservationResult';
            }
        } else {
            logger.error('unsupported system for observation %s', system);
        }
        return null;
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
            if (type !== null) {
                var byTypeEntry = byType[type];
                if (!byTypeEntry) {
                    byType[type] = byTypeEntry = [];
                }
                byTypeEntry.push(resource);
            }
        });
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
