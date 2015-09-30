"use strict";

var leafLevel = require('./leafLevel');

exports.allergyStatusObservation = {
    content: {
        observation: {
            content: {
                '$': {
                    constant: {
                        'classCode': 'OBS',
                        'moodCode': 'EVN'
                    }
                },
                templateId: leafLevel.templateId('2.16.840.1.113883.10.20.22.4.28'),
                'code.$': {
                    constant: {
                        'code': '33999-4',
                        'codeSystem': '2.16.840.1.113883.6.1',
                        'codeSystemName': 'LOINC',
                        'displayName': 'Status'
                    }
                },
                'statusCode.$.code': 'completed',
                'value.$': {
                    assign: [{
                        content: {
                            "xsi:type": "CE"
                        }
                    }, {
                        value: leafLevel.codeToValueSet('sensitivityStatus')
                    }]
                }
            }
        },
    },
    dataKey: 'status'
};

exports.reactionObservation = {
    content: {
        observation: {
            content: {
                '$': {
                    constant: {
                        'classCode': 'OBS',
                        'moodCode': 'EVN'
                    }
                },
                templateId: leafLevel.templateId('2.16.840.1.113883.10.20.22.4.9'),
                'code.$.nullFlavor': 'NA',
                'statusCode.$.code': 'completed',
                'value.$': {
                    assign: [{
                        content: {
                            "xsi:type": "CD"
                        }
                    }, {
                        value: leafLevel.codeToValueSet('sensitivityStatus') // To be fixed
                    }]
                }
            }
        },
    },
    dataKey: 'status' // To be fixed
};

exports.allergyIntoleranceObservation = {
    content: {
        observation: {
            content: {
                '$': {
                    constant: {
                        'classCode': 'OBS',
                        'moodCode': 'EVN'
                    }
                },
                templateId: leafLevel.templateId('2.16.840.1.113883.10.20.22.4.7'),
                'code.$': {
                    constant: {
                        code: 'ASSERTION',
                        codeSystem: '2.16.840.1.113883.5.4'
                    }
                },
                'statusCode.$.code': 'completed',
                participant: {
                    content: {
                        '$.typeCode': 'CSM',
                        'participantRole': {
                            content: {
                                '$.classCode': 'MANU',
                                playingEntity: {
                                    content: {
                                        '$.classCode': 'MMAT',
                                        code: leafLevel.code
                                    }
                                }
                            }
                        }
                    },
                    dataKey: 'substance[0].coding[0]'
                },
                entryRelationship: {
                    arrayContent: [{
                        assign: [{
                                content: {
                                    '$': {
                                        constant: {
                                            typeCode: 'SUBJ',
                                            inversionInd: 'true'
                                        }
                                    }
                                }
                            }, exports.allergyStatusObservation]
                            //                    }, {
                            //                        assign: [{
                            //                            content: {
                            //                                '$': {
                            //                                    constant: {
                            //                                        typeCode: 'MFST',
                            //                                        inversionInd: 'true'
                            //                                    }
                            //                                }
                            //                            }
                            //                        }, exports.reactionObservation]
                    }]
                }
            }
        }
    }
};

exports.allergyProblemAct = {
    content: {
        act: {
            content: {
                '$': {
                    constant: {
                        classCode: 'ACT',
                        moodCode: 'EVN'
                    }
                },
                templateId: leafLevel.templateId('2.16.840.1.113883.10.20.22.4.30'),
                code: {
                    constant: {
                        '$': {
                            'code': '48765-2',
                            'codeSystem': '2.16.840.1.113883.6.1',
                            'codeSystemName': 'LOINC',
                            'displayName': 'Allergies, adverse reactions, alerts'
                        }
                    }
                },
                'statusCode.$.code': {
                    value: leafLevel.codeToValueSet('problemActStatusCode'),
                    dataKey: 'status'
                },
                entryRelationship: {
                    assign: [{
                        content: {
                            '$': {
                                constant: {
                                    typeCode: 'SUBJ',
                                    inversionInd: 'true'
                                }
                            }
                        }
                    }, exports.allergyIntoleranceObservation]
                }
            }
        }
    }
};

exports.problemStatus = {
    content: {
        observation: {
            content: {
                '$': {
                    constant: {
                        classCode: 'OBS',
                        moodCode: 'EVN'
                    }
                },
                templateId: leafLevel.templateId('2.16.840.1.113883.10.20.22.4.6'),
                'code.$': {
                    constant: {
                        code: "33999-4",
                        codeSystem: "2.16.840.1.113883.6.1",
                        codeSystemName: 'LOINC',
                        displayName: 'Status'
                    }
                },
                'statusCode.$.code': 'completed',
                'value.$': leafLevel.codeToValueSet('conditionClinical')
            }
        }
    }
};

exports.problemObservation = {
    content: {
        observation: {
            content: {
                '$': {
                    constant: {
                        classCode: 'OBS',
                        moodCode: 'EVN'
                    }
                },
                templateId: leafLevel.templateId('2.16.840.1.113883.10.20.22.4.4'),
                code: {
                    value: leafLevel.code,
                    dataKey: 'category.coding[0]'
                },
                'statusCode.$.code': 'completed',
                'value.$': {
                    assign: [{
                        constant: {
                            'xsi:type': 'CD'
                        }
                    }, {
                        value: leafLevel.codeOnly,
                        dataKey: 'code.coding[0]'
                    }]
                },
                entryRelationship: {
                    arrayContent: [{
                        assign: [{
                            content: {
                                '$.typeCode': 'REFR',
                            }
                        }, exports.problemStatus]
                    }],
                    dataKey: 'clinicalStatus'
                }
            }
        }
    }
};

exports.problemConcernAct = {
    content: {
        act: {
            content: {
                '$': {
                    constant: {
                        classCode: 'ACT',
                        moodCode: 'EVN'
                    }
                },
                templateId: leafLevel.templateId('2.16.840.1.113883.10.20.22.4.3'),
                code: {
                    constant: {
                        '$': {
                            'code': 'CONC',
                            'codeSystem': '2.16.840.1.113883.5.6',
                            'displayName': 'Concern'
                        }
                    }
                },
                'statusCode.$.code': 'completed',
                entryRelationship: {
                    assign: [{
                        content: {
                            '$.typeCode': 'SUBJ',
                        }
                    }, exports.problemObservation],
                    multiple: true
                }
            }
        }
    }
};
