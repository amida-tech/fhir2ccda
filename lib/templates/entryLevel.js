"use strict";

var leafLevel = require('./leafLevel');

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
