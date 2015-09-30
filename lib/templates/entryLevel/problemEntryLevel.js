"use strict";

var leafLevel = require('../leafLevel');

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
