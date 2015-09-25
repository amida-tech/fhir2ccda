"use strict";

var leafLevel = require('./leafLevel');

exports.id = {
    content: {
        '$': {
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

exports.usRealmName = {
    content: {
        given: {
            dataKey: 'given'
        },
        family: {
            dataKey: 'family'
        }
    }
};

exports.usRealmAddress = {
    content: {
        '$.use': {
            value: leafLevel.codeToValueSet('addressUse'),
            dataKey: 'use'
        },
        country: {
            dataKey: 'country'
        },
        state: {
            dataKey: 'state'
        },
        city: {
            dataKey: 'city'
        },
        postalCode: {
            dataKey: 'postalCode'
        },
        streetAddressLine: {
            dataKey: 'line'
        }
    },
    dataKey: "address"
};

exports.telecom = {
    content: {
        '$': {
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
