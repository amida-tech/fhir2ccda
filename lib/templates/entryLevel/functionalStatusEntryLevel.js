"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

var jp = jsonave.instance;

exports.caregiverCharacteristics = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.86'),
                fieldLevel.id, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'value',
                        attr: {
                            content: {
                                'xsi:type': 'INT',
                                value: _.identity
                            }
                        },
                        dataKey: 'TBD'
                    }
                }, {
                    content: {
                        name: 'participant',
                        'attr.typeCode': 'IND',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'participantRole',
                                    'attr.typeCode': 'CAREGIVER',
                                    children: {
                                        arrayContent: [{
                                                content: {
                                                    name: 'code',
                                                    attr: leafLevel.code
                                                },
                                                dataKey: 'TBD'
                                            }

                                        ]
                                    }
                                }
                            }]
                        }
                    }
                }
            ]
        }
    }
};

exports.assessmentScaleSupportingObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.86'),
                fieldLevel.id, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'value',
                        attr: {
                            content: {
                                'xsi:type': 'INT',
                                value: _.identity
                            }
                        },
                        dataKey: 'TBD'
                    }
                }
            ]
        }
    }
};

exports.assessmentScaleObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.69'),
                fieldLevel.id, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'derivationExpr',
                        text: _.identity
                    },
                    dataKey: 'TBD'
                },
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'value',
                        attr: {
                            content: {
                                'xsi:type': 'INT',
                                value: _.identity
                            }
                        },
                        dataKey: 'TBD'
                    }
                }, {
                    content: {
                        name: 'entryRelationship',
                        'attr.typeCode': 'COMP',
                        children: {
                            arrayContent: [
                                exports.assessmentScaleSupportingObservation
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    }
};

exports.cognitiveStatusResultObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.2'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.74'),
                fieldLevel.id,
                h.constAttrChild('code', {
                    code: '373930000',
                    displayName: 'Cognitive function finding',
                    codeSystem: '2.16.840.1.113883.6.96',
                    codeSystemName: 'SNOMED CT'
                }),
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time
                    },
                    dataKey: 'effectiveDateTime'
                }, {
                    content: {
                        name: 'value',
                        attr: leafLevel.code
                    },
                    dataKey: 'valueCodeableConcept.coding[0]'
                }, {
                    content: {
                        name: 'interpretationCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'interpretation.coding[0]'
                }, {
                    content: {
                        name: 'entryRelationship',
                        'attr.typeCode': 'COMP',
                        children: {
                            arrayContent: [
                                exports.assessmentScaleObservation
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'referenceRange',
                        children: {
                            content: {
                                name: 'observationRange',
                                children: {
                                    content: {
                                        name: 'text',
                                        text: _.identity
                                    },
                                    multiple: true
                                }
                            },
                            multiple: true
                        }
                    },
                    dataKey: 'referenceRange[0].text'
                }
            ]
        }
    }
};

exports.cognitiveStatusResultOrganizer = {
    content: {
        name: 'organizer',
        attr: {
            constant: {
                classCode: 'CLUSTER',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.1'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.75'),
                fieldLevel.id, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'component',
                        children: {
                            arrayContent: [
                                exports.cognitiveStatusResultObservation
                            ]
                        }
                    }
                }
            ]
        }
    },
    existsWhen: _.matchesProperty('code.coding[0].code', '373930000')
};

exports.functionalStatusResultObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.2'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.67'),
                fieldLevel.id, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'code.coding[0]'
                },
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time
                    },
                    dataKey: 'effectiveDateTime'
                }, {
                    content: {
                        name: 'value',
                        attr: leafLevel.code
                    },
                    dataKey: 'valueCodeableConcept.coding[0]'
                }, {
                    content: {
                        name: 'interpretationCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'interpretation.coding[0]'
                }, {
                    content: {
                        name: 'entryRelationship',
                        'attr.typeCode': 'REFR',
                        children: {
                            arrayContent: [
                                exports.caregiverCharacteristics
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'entryRelationship',
                        'attr.typeCode': 'COMP',
                        children: {
                            arrayContent: [
                                exports.assessmentScaleObservation
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'referenceRange',
                        children: {
                            content: {
                                name: 'observationRange',
                                children: {
                                    content: {
                                        name: 'text',
                                        text: _.identity
                                    },
                                    multiple: true
                                }
                            },
                            multiple: true
                        }
                    },
                    dataKey: 'referenceRange[0]'
                }
            ]
        }
    }
};

exports.functionalStatusResultOrganizer = {
    content: {
        name: 'organizer',
        attr: {
            constant: {
                classCode: 'CLUSTER',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.1'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.66'),
                fieldLevel.id, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'component',
                        children: {
                            arrayContent: [
                                exports.functionalStatusResultObservation
                            ]
                        }
                    }
                }
            ]
        }
    },
    existsUnless: _.matchesProperty('code.coding[0].code', '373930000')
};
