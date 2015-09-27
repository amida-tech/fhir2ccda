"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var jp = jsonave.instance;

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

    var actionMap = {
        arrayize: function (obj, actionInfo) {
            applyToParentProperty(obj, actionInfo.path, function (element, property) {
                var leaf = element[property];
                if ((leaf !== undefined) && (leaf !== null) && !Array.isArray(leaf)) {
                    element[property] = [leaf];
                }
            });
        },
        delete: function (obj, actionInfo) {
            applyToParentProperty(obj, actionInfo.path, function (element, property) {
                delete element[property];
            });
        },
        filter: function (obj, actionInfo) {
            var components = _.get(obj, actionInfo.path, null);
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
                _.set(obj, actionInfo.path, newComponents);
            }
        },
        root: function (obj, actionInfo) {
            var root = _.get(obj, actionInfo.path, null);
            this.run(root, actionInfo.children);
        },
        run: function (obj, actionInfos) {
            var self = this;
            actionInfos.forEach(function (actionInfo) {
                var actionKey = actionInfo.actionKey;
                var action = self[actionKey];
                action.call(self, obj, actionInfo);
            });
        }
    };

    return function (obj, actionInfos) {
        actionMap.run(obj, actionInfos);
    };
})();
