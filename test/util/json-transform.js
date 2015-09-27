"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var jp = jsonave.instance;

exports.arrayizeAll = function (obj, path) {
    var pieces = path.split('.');
    var n = pieces.length;
    var property = pieces[n - 1];
    path = path + '.^';
    var f = jp(path, {
        wrap: true
    });
    var elements = f(obj);
    elements.forEach(function (element) {
        var leaf = element[property];
        if ((leaf !== undefined) && (leaf !== null) && !Array.isArray(leaf)) {
            element[property] = [leaf];
        }
    });
};

exports.transform = (function () {
    var getLastPiece = function (path, delimiter) {
        var pieces = path.split(delimiter);
        var n = pieces.length;
        return pieces[n - 1];
    };

    var findLastProperty = function (path) {
        var pathLength = path.length;
        if (path.charAt(pathLength - 1) === ']') {
            var r = getLastPiece(path, '[');
            var n = r.length;
            return r.substring(1, n - 2);
        } else {
            return getLastPiece(path, '.');
        }
    };

    var applyToParentProperty = function (obj, path, action) {
        var property = findLastProperty(path);
        path = path + '.^';
        var f = jp(path, {
            wrap: true
        });
        var elements = f(obj);
        elements.forEach(function (element) {
            action(element, property);
        });
    };

    var fArrayize = function (element, property) {
        var leaf = element[property];
        if ((leaf !== undefined) && (leaf !== null) && !Array.isArray(leaf)) {
            element[property] = [leaf];
        }
    };

    var fDelete = function (element, property) {
        delete element[property];
    };

    var actionMap = {
        arrayize: {
            modify: function (obj, path) {
                applyToParentProperty(obj, path, fArrayize);
            }
        },
        delete: {
            modify: function (obj, path) {
                applyToParentProperty(obj, path, fDelete);
            }
        },
        filter: {
            modify: function (obj, path, actionInfo) {
                var components = _.get(obj, path, null);
                if (components && Array.isArray(components)) {
                    var f = jp(actionInfo.filterPath, {
                        wrap: true
                    });
                    var newComponents = components.reduce(function (r, component) {
                        var componentValues = f(component);
                        for (var i = 0; i < componentValues.length; ++i) {
                            var componentValue = componentValues[i];
                            if (actionInfo.values.indexOf(componentValue) >= 0) {
                                r.push(component);
                                break;
                            }
                        }
                        return r;
                    }, []);
                    _.set(obj, path, newComponents);
                }
            }
        }
    };

    return function (obj, actionInfos) {
        actionInfos.forEach(function (actionInfo) {
            var path = actionInfo.path;
            if (path) {
                var actionKey = actionInfo.actionKey;
                var action = actionKey && actionMap[actionKey];
                if (action) {
                    action.modify(obj, path, actionInfo);
                }
            }
        });
    };
})();
