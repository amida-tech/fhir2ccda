"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

var jp = jsonave.instance;

var policyActivity = {
    content: {
        name: 'act',
        attr: {
            constant: {
                classCode: 'ACT',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.61'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'performer',
                        'attr.typeCode': 'PRF',
                        children: {
                            arrayContent: [
                                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.87'),
                                fieldLevel.assignedEntity2
                            ]
                        }
                    },
                    dataKey: jp('coverage[0].coverage.reference.getById().issuer.reference.getById()')
                }, {
                    content: {
                        name: 'performer',
                        'attr.typeCode': 'PRF',
                        children: {
                            arrayContent: [
                                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.88'), {
                                    content: {
                                        name: 'assignedEntity',
                                        children: {
                                            arrayContent: [{
                                                content: {
                                                    name: 'code',
                                                    attr: {
                                                        constant: {
                                                            code: 'GUAR',
                                                            codeSystem: '2.16.840.1.113883.5.111'
                                                        }
                                                    }
                                                }

                                            }].concat(fieldLevel.assignedEntity.content.children.arrayContent)
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    dataKey: jp('coverage[0].coverage.reference.getById().subscriber.reference.getById().contact[?(@.relationship[0].coding[0].code==="GUAR")]'),
                    single: true
                }, {
                    content: {
                        name: 'participant',
                        'attr.typeCode': 'COV',
                        children: {
                            arrayContent: [
                                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.89'), {
                                    content: {
                                        name: 'effectiveTime'
                                    }
                                }, {
                                    content: {
                                        name: 'participantRole',
                                        'attr.classCode': 'PAT',
                                        children: {
                                            arrayContent: [
                                                fieldLevel.usRealmAddress,
                                                fieldLevel.telecom, {
                                                    content: {
                                                        name: 'code',
                                                        attr: leafLevel.code
                                                    },
                                                    dataKey: 'TBD'
                                                }, {
                                                    content: {
                                                        name: 'playingEntity',
                                                        children: {
                                                            arrayContent: [
                                                                fieldLevel.usRealmName
                                                            ]
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'participant',
                        'attr.typeCode': 'HLD',
                        children: {
                            arrayContent: [
                                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.90'), {
                                    content: {
                                        name: 'participantRole',
                                        children: {
                                            arrayContent: [
                                                fieldLevel.usRealmAddress
                                            ]
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'entryRelationship',
                        'attr.typeCode': 'REFR',
                        children: {
                            content: {
                                name: 'act',
                                attr: {
                                    constant: {
                                        classCode: 'ACT',
                                        moodCode: 'EVN'
                                    }
                                },
                                children: {
                                    arrayContent: [
                                        fieldLevel.templateId('2.16.840.1.113883.10.20.1.19'), {
                                            content: {
                                                name: 'entryRelationship',
                                                'attr.typeCode': 'SUBJ',
                                                children: {
                                                    arrayContent: [{
                                                        content: {
                                                            name: 'procedure',
                                                            attr: {
                                                                constant: {
                                                                    classCode: 'PROC',
                                                                    moodCode: 'PRMS'
                                                                }
                                                            },
                                                            children: {
                                                                content: {
                                                                    name: 'code',
                                                                    attr: leafLevel.code
                                                                },
                                                                multiple: true
                                                            }
                                                        }
                                                    }]
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            multiple: true
                        }
                    },
                    dataKey: 'item[0].service'
                }
            ]
        }
    }
};

exports.coverageActivity = {
    content: {
        name: 'act',
        attr: {
            constant: {
                classCode: 'ACT',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.60'),
                h.constAttrChild('code', {
                    code: '48768-6',
                    displayName: 'Payment sources',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'entryRelationship',
                        'attr.typeCode': 'COMP',
                        children: {
                            arrayContent: [
                                policyActivity
                            ]
                        }
                    }
                }
            ]
        }
    }
};
