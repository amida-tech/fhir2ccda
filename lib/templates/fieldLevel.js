"use strict";

var _ = require('lodash');

var leafLevel = require('./leafLevel');

exports.constAttrChild = function(name, attr) {
    return {
        content: {
            name: name,
            attr: {constant: attr}
        }
    };
};

exports.templateId = function(value) {
    return exports.constAttrChild('templateId', {root: value});
};

exports.id = {
    content: {
        name: 'id',
        attr: {
            content: {
                root: {
                    value: function (input) {
                        if (input.substring(0, 8) === 'urn:oid:') {
                            return input.substring(8);
                        } else {
                            return input;
                        }
                    },
                    dataKey: 'system'
                },
                extension: {
                    dataKey: 'value'
                }
            }
        }
    },
    dataKey: 'identifier'
};

exports.usRealmAddress = function(name, dataKey) {
    return {
        content: {
            name: name,
            'attr.use': {
                value: leafLevel.codeToValueSet('addressUse'),
                dataKey: 'use'
            },
            children: {
                arrayContent: [{
                    content: {
                        name: 'streetAddressLine',
                        text: _.identity
                    },
                    dataKey: 'line'
                }, {
                    content: {
                        name: 'city',
                        text: _.identity
                    },
                    dataKey: 'city'
                }, {
                    content: {
                        name: 'state',
                        text: _.identity
                    },
                    dataKey: 'state'
                }, {
                    content: {
                        name: 'postalCode',
                        text: _.identity
                    },
                    dataKey: 'postalCode'
                }, {
                    content: {
                        name: 'country',
                        text: _.identity
                    },
                    dataKey: 'country'
                }]
            }
        },
        dataKey: dataKey
    };
};

exports.telecom = {
    content: {
        name: 'telecom',
        attr: {
            content: {
                value: leafLevel.telecomValue,
                use: {
                    value: leafLevel.codeToValueSet('phoneUse'),
                    dataKey: 'use'
                }
            }
        }
    },
    dataKey: 'telecom'
};

exports.usRealmName = {
    content: {
        name: 'name',
        children: {
            arrayContent: [{
                content: {
                    name: 'given',
                    text: _.identity
                },
                dataKey: 'given'
            }, {
                content: {
                    name: 'family',
                    text: _.identity
                },
                dataKey: 'family'
            }]
        }
    },
    dataKey: 'name[0]'
};
