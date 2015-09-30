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
        //delete: function (obj, actionInfo) {
        //    applyToParentProperty(obj, actionInfo.path, function (element, property) {
        //        delete element[property];
        //    });
        //},
        delete: function (obj, actionInfo) {
            var f = jp(actionInfo.path, {
                wrap: true,
                resultType: 'patharray'
            });
            var paths = f(obj);
            paths.reverse();
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
                        if (typeof property === "string") {
                            delete parent[property];
                        } else {
                            parent.splice(property, 1);
                        }
                    }
                }
            });
        },
        filter: function (obj, actionInfo) {
            var g = jp(actionInfo.path, {
                wrap: true
            });
            var components = g(obj);
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
                var h = jp(actionInfo.parentPath, {
                    wrap: false
                });
                var parent = h(obj);
                parent[actionInfo.property] = newComponents;
            }
        },
        filter2: function (obj, actionInfo) {
            var g = jp(actionInfo.parentPath, {
                wrap: true
            });
            var components = g(obj);
            if (components && Array.isArray(components)) {
                components.forEach(function (component) {
                    var f = jp(actionInfo.filterPath, {
                        wrap: true
                    });
                    var newProperty = component[actionInfo.property].reduce(function (r, component) {
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
                    if (newProperty.length === 0) {
                        delete component[actionInfo.property];
                    } else {
                        component[actionInfo.property] = newProperty;
                    }
                });
            }
        },
        assign: function (obj, actionInfo) {
            var g = jp(actionInfo.path, {
                wrap: true
            });
            var components = g(obj);
            console.log(components);
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
        root2: function (obj, actionInfo) {
            var f = jp(actionInfo.path, {
                wrap: true
            });
            var roots = f(obj);
            console.log(roots);
            //roots.forEach(function (root) {
            //    this.run(root, actionInfo.children);
            //}, this);
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
