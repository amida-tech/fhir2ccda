"use strict";

var _ = require('lodash');

var entryLevel = require('./entryLevel');
var fieldLevel = require('./fieldLevel');
var leafLevel = require('./leafLevel');

exports.allergiesSectionEntriesRequired = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.6'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.6.1'),
                fieldLevel.constAttrChild('code', {
                    code: "48765-2",
                    displayName: 'Allergies, adverse reactions, alerts',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: "LOINC"
                }), {
                    content: {
                        name: 'title',
                        text: 'Allergies, adverse reactions, alerts'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.allergyProblemAct
                            ]
                        }
                    },
                    dataKey: 'byType.AllergyIntolerance'
                }
            ]
        }

        /*


                templateId: leafLevel.templateId(['2.16.840.1.113883.10.20.22.2.6', '2.16.840.1.113883.10.20.22.2.6.1']),
                code: {
                    constant: {
                        '$': {
                            code: "48765-2",
                            displayName: 'Allergies, adverse reactions, alerts',
                            codeSystem: '2.16.840.1.113883.6.1',
                            codeSystemName: "LOINC"
                        }
                    }
                },
                title: 'Allergies, adverse reactions, alerts',
                entry: {
                    assign: [{
                        content: {
                            '$.typeCode': 'DRIV'
                        }
                    }, entryLevel.allergyProblemAct],
                    dataKey: 'byType.AllergyIntolerance'
                }*/
    }
};

exports.problemsSectionEntriesRequired = {
    content: {
        templateId: leafLevel.templateId(['2.16.840.1.113883.10.20.22.2.5', '2.16.840.1.113883.10.20.22.2.5.1']),
        code: {
            constant: {
                '$': {
                    code: "11450-4",
                    displayName: 'Problem List',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: "LOINC"
                }
            }
        },
        title: 'Problem List',
        entry: {
            assign: [{
                content: {
                    '$.typeCode': 'DRIV'
                }
            }, entryLevel.problemConcernAct],
            dataKey: 'byType.Condition'
        }
    }
};
