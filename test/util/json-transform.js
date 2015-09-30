"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var jp = jsonave.instance;

var uniqifyPaths = function (paths) {
    var asString = paths.map(function (path) {
        var pathAsString = path.map(function (e) {
            if (typeof e === "string") {
                return 's' + e;
            } else {
                return 'i' + e;
            }
        });
        return pathAsString.join('\n');
    });
    var deduplicated = _.uniq(asString);
    return deduplicated.map(function (path) {
        var raw = path.split('\n');
        return raw.map(function (e) {
            if (e.charAt(0) === 's') {
                return e.substring(1);
            } else {
                var intValue = e.substring(1);
                return parseInt(intValue, 10);
            }
        });
    });
};

exports.transform = (function () {
    var actionMap = {
        applyParentProperty: function (obj, actionInfo, fn) {
            var f = jp(actionInfo.path, {
                wrap: true,
                resultType: 'patharray'
            });
            var paths = f(obj);
            paths.reverse();
            paths = uniqifyPaths(paths);
            paths.forEach(function (path) {
                var n = path.length;
                if (n > 0) {
                    var parent = obj;
                    if (n > 1) {
                        var parentPath = path.slice(0, n - 1);
                        parent = _.get(obj, parentPath, null);
                    }
                    var property = path[n - 1];
                    if (parent !== null) {
                        fn(parent, property);
                    }
                }
            });
        },
        arrayize: function (obj, actionInfo) {
            this.applyParentProperty(obj, actionInfo, function (parent, property) {
                var value = parent[property];
                if (value && !Array.isArray(value)) {
                    parent[property] = [value];
                }
            });
        },
        delete: function (obj, actionInfo) {
            this.applyParentProperty(obj, actionInfo, function (parent, property) {
                if (typeof property === "string") {
                    delete parent[property];
                } else {
                    parent.splice(property, 1);
                }
            });
        },
        root: function (obj, actionInfo) {
            var f = jp(actionInfo.path, {
                wrap: true
            });
            var roots = f(obj);
            roots.forEach(function (root) {
                this.run(root, actionInfo.children);
            }, this);
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
