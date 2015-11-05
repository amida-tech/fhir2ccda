"use strict";

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

var h = require('../templateHelper');

exports.severityObservation = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                classCode: "OBS",
                moodCode: "EVN"
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.8'),
                h.constAttrChild('code', {
                    code: 'SEV',
                    displayName: 'Severity Observation',
                    codeSystem: '2.16.840.1.113883.5.4',
                    codeSystemName: 'ActCode'
                }),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'value',
                        attr: {
                            assign: [{
                                    constant: {
                                        "xsi:type": "CD"
                                    }
                                },
                                leafLevel.codeToValueSet('reactionSeverity')
                            ]
                        }
                    }
                }
            ]
        }
    }
};

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
                h.constAttrChild('code', {
                    code: '33999-4',
                    displayName: 'Status',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }),
                h.constAttrChild('statusCode', {
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
                h.constAttrChild('code', {
                    nullFlavor: 'NA'
                }),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'value',
                        attr: {
                            assign: [{
                                constant: {
                                    "xsi:type": "CD"
                                }
                            }, {
                                value: leafLevel.code,
                                dataKey: 'manifestation[0].coding[0]'
                            }]
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
                                exports.severityObservation
                            ]
                        }
                    },
                    dataKey: 'severity'
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
                h.constAttrChild('code', {
                    code: 'ASSERTION',
                    codeSystem: '2.16.840.1.113883.5.4'
                }),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'low',
                                    'attr.value': leafLevel.time
                                },
                                dataKey: 'reaction[0].onset'
                            }]
                        }
                    }
                }, {
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
                    dataKey: 'substance.coding[0]'
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
                h.constAttrChild('code', {
                    code: '48765-2',
                    displayName: 'Allergies, adverse reactions, alerts',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
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
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time,
                    },
                    dataKey: 'lastOccurence'
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
};
