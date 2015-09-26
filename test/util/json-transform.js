"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var jp = jsonave.instance;

exports.arrayize = function (obj, paths) {
    paths.forEach(function (path) {
        var v = _.get(obj, path, null);
        if ((v !== null) && !Array.isArray(v)) {
            _.set(obj, path, [v]);
        }
    });
};

exports.delete = function (obj, paths) {
    paths.forEach(function (path) {
        var pathArray = path.split('.');
        var n = pathArray.length;
        var prop = pathArray[n - 1];
        var parentObject = obj;
        if (n > 1) {
            var pathm1 = pathArray.slice(0, n - 1).join('.');
            parentObject = _.get(obj, pathm1, null);
        }
        if (parentObject !== null) {
            delete parentObject[prop];
        }
    });
};

exports.deleteTemplate = function (obj, path, templatePath, id) {
    var components = _.get(obj, path, null);
    if (components && Array.isArray(components)) {
        var f = jp(templatePath);
        var newComponents = components.reduce(function (r, component) {
            var componentIds = f(component);
            if (componentIds && (componentIds.indexOf(id) < 0)) {
                r.push(component);
            }
            return r;
        }, []);
        _.set(obj, path, newComponents);
    }
};

exports.deleteTemplates = function (obj, path, templatePath, ids) {
    ids.forEach(function (id) {
        exports.deleteTemplate(obj, path, templatePath, id);
    });
};
