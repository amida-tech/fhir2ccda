"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var leafLevel = require('./leafLevel');

var h = require('./templateHelper');

var jp = jsonave.instance;

exports.templateId = function (value) {
    return h.constAttrChild('templateId', {
        root: value
    });
};

exports.statusCodeCompleted = h.constAttrChild('statusCode', {
    code: 'completed'
});

exports.id = {
    content: {
        name: 'id',
        attr: {
            content: {
                extension: {
                    dataKey: 'value'
                },
                root: {
                    value: function (input) {
                        if (input.substring(0, 8) === 'urn:oid:') {
                            return input.substring(8);
                        } else {
                            return input;
                        }
                    },
                    dataKey: 'system'
                }
            }
        }
    },
    dataKey: 'identifier'
};

exports.id2 = {
    content: {
        name: 'id',
        'attr.root': {
            dataKey: 'value'
        }
    },
    dataKey: 'identifier'
};

exports.usRealmAddress = {
    content: {
        name: 'addr',
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
        'attr.use': {
            value: leafLevel.codeToValueSet('entityNameUse'),
            dataKey: 'use'
        },
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
    }
};

exports.representedOrganization = {
    content: {
        name: 'representedOrganization',
        children: {
            arrayContent: [{
                    content: {
                        name: 'name',
                        text: _.identity
                    },
                    dataKey: 'name'
                },
                exports.telecom, {
                    value: exports.usRealmAddress,
                    dataKey: 'address'
                }
            ]
        }
    }
};

exports.author = {
    content: {
        name: 'author',
        children: {
            arrayContent: [{
                content: {
                    name: 'assignedAuthor',
                    children: {
                        arrayContent: [{
                                content: {
                                    name: 'assignedPerson',
                                    children: {
                                        arrayContent: [{
                                            value: exports.usRealmName,
                                            dataKey: 'name'
                                        }]
                                    }
                                }
                            }] //, exports.representedOrganization]
                    }
                }
            }]
        }
    }
};

exports.assignedEntity = {
    content: {
        name: 'assignedEntity',
        children: {
            arrayContent: [{
                    content: {
                        name: 'id',
                        'attr.root': _.identity
                    },
                    dataKey: 'identifier[0].value'
                }, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'practitionerRole[0].specialty[0].coding[0]'
                }, {
                    value: exports.usRealmAddress,
                    dataKey: 'address'
                },
                exports.telecom, {
                    content: {
                        name: 'assignedPerson',
                        children: {
                            arrayContent: [
                                exports.usRealmName
                            ]
                        }
                    },
                    dataKey: 'name'
                }, {
                    value: exports.representedOrganization,
                    dataKey: jp('practitionerRole[0].managingOrganization.reference.getById()')
                }
            ]
        }
    }
};

exports.assignedEntity2 = {
    content: {
        name: 'assignedEntity',
        children: {
            arrayContent: [{
                    content: {
                        name: 'id',
                        'attr.root': _.identity
                    },
                    dataKey: 'identifier[0].value'
                }, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'practitionerRole[0].specialty[0].coding[0]'
                }, {
                    value: exports.usRealmAddress,
                    dataKey: 'address'
                },
                exports.telecom,
                exports.representedOrganization,
            ]
        }
    }
};

exports.performer = {
    content: {
        name: 'performer',
        children: {
            arrayContent: [
                exports.assignedEntity
            ]
        }
    }
};

exports.administrativeGenderCode = {
    content: {
        name: 'administrativeGenderCode',
        attr: {
            content: {
                code: {
                    value: leafLevel.codeToValueSet('genderCode')
                },
                displayName: {
                    value: leafLevel.codeToValueSet('genderDisplay')
                },
                codeSystem: '2.16.840.1.113883.5.1',
            }
        }
    },
    dataKey: 'gender'
};
