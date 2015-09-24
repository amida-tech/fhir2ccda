"use strict";

var jsonapter = require('jsonapter');
var _ = require('lodash');
var xml2js = require('xml2js');

var toResourceDictionary = exports.toResourceDictionary = function (bundleEntries) {
    var byId = {};
    var byType = {};
    if (bundleEntries) {
        bundleEntries.forEach(function (bundleEntry) {
            var resource = bundleEntry.resource;
            var id = resource.id;
            byId[id] = resource;
            var type = resource.resourceType;
            var byTypeEntry = byType[type];
            if (!byTypeEntry) {
                byType[type] = byTypeEntry = [];
            }
            byTypeEntry.push(resource);
        });
    }
    return {
        byId: byId,
        byType: byType
    };
};

exports.instance = function (resourceDict) {
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
    var j2j = jsonapter.instance(resourceDictionary);
    var result = j2j.run(template, resourceDictionary);
    if (!options.json) {
        var builder = new xml2js.Builder();
        result = builder.buildObject(result);
    }
    return result;
};
