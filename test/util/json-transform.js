"use strict";

var _ = require('lodash');

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
