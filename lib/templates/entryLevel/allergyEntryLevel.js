"use strict";

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

exports.allergyStatusObservation = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                classCode: 'OBS',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.28'),
                fieldLevel.constAttrChild('code', {
                    code: '33999-4',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC',
                    displayName: 'Status'
                }),
                fieldLevel.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'value',
                        attr: {
                            assign: [{
                                    constant: {
                                        "xsi:type": "CE"
                                    }
                                },
                                leafLevel.codeToValueSet('sensitivityStatus')
                            ]
                        }
                    }
                }
            ]
        }
    }
};

exports.reactionObservation = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                classCode: 'OBS',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.9'),
                fieldLevel.constAttrChild('code', {
                    nullFlavor: 'NA'
                }),
                fieldLevel.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    name: 'value',
                    attr: {
                        assign: [{
                            constant: {
                                "xsi:type": "CD"
                            }
                        }, {
                            content: {
                                value: leafLevel.codeToValueSet('sensitivityStatus')
                            }
                        }]
                    }
                }
            ]
        }
    }
};

exports.allergyIntoleranceObservation = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                'classCode': 'OBS',
                'moodCode': 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.7'),
                fieldLevel.constAttrChild('code', {
                    code: 'ASSERTION',
                    codeSystem: '2.16.840.1.113883.5.4'
                }),
                fieldLevel.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'participant',
                        attr: {
                            constant: {
                                typeCode: 'CSM'
                            }
                        },
                        children: {
                            content: {
                                name: 'participantRole',
                                attr: {
                                    constant: {
                                        classCode: 'MANU'
                                    }
                                },
                                children: {
                                    content: {
                                        name: 'playingEntity',
                                        attr: {
                                            constant: {
                                                classCode: 'MMAT'
                                            }
                                        },
                                        children: {
                                            content: {
                                                name: 'code',
                                                attr: leafLevel.code
                                            },
                                            multiple: true
                                        }
                                    },
                                    multiple: true
                                }
                            },
                            multiple: true
                        }
                    },
                    dataKey: 'substance[0].coding[0]'
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'SUBJ',
                                inversionInd: 'true'
                            }
                        },
                        children: {
                            arrayContent: [
                                exports.allergyStatusObservation
                            ]
                        }
                    },
                    dataKey: 'status'
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'MFST',
                                inversionInd: 'true'
                            }
                        },
                        children: {
                            arrayContent: [
                                exports.reactionObservation
                            ]
                        }
                    },
                    dataKey: 'reaction'
                }
            ]
        }
    }
};

exports.allergyProblemAct = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.30'),
                fieldLevel.constAttrChild('code', {
                    code: '48765-2',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC',
                    displayName: 'Allergies, adverse reactions, alerts'
                }), {
                    content: {
                        name: 'statusCode',
                        attr: {
                            content: {
                                code: {
                                    value: leafLevel.codeToValueSet('problemActStatusCode'),
                                    dataKey: 'status'
                                }
                            }
                        }
                    }
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'SUBJ',
                                inversionInd: 'true'
                            }
                        },
                        children: {
                            arrayContent: [
                                exports.allergyIntoleranceObservation
                            ]
                        }
                    }
                }
            ]
        }
    }

    /*
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
            }*/
};
