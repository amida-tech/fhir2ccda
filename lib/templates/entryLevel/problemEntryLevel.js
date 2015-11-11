"use strict";

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

var h = require('../templateHelper');
var commonTemplates = require('../commonTemplates');

var sharedEntryLevel = require('./sharedEntryLevel');

exports.problemStatus = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.6'),
                h.constAttrChild('code', {
                    code: "33999-4",
                    displayName: 'Status',
                    codeSystem: "2.16.840.1.113883.6.1",
                    codeSystemName: 'LOINC'
                }),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'value',
                        attr: leafLevel.codeToValueSet('conditionClinical')
                    }
                }
            ]
        }
    }
};

exports.problemObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.4'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: ['category.coding[0]', 'category.coding']
                },
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
                                dataKey: 'start'
                            }, {
                                content: {
                                    name: 'high',
                                    'attr.value': leafLevel.time
                                },
                                dataKey: 'end'
                            }]
                        }
                    },
                    dataKey: 'onsetPeriod'
                }, {
                    content: {
                        name: 'effectiveTime',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'low',
                                    'attr.value': leafLevel.time
                                }
                            }, {
                                content: {
                                    name: 'high',
                                    'attr.value': leafLevel.time
                                }
                            }]
                        }
                    },
                    dataKey: 'onsetDateTime'
                }, {
                    content: {
                        name: 'value',
                        attr: {
                            assign: [{
                                    constant: {
                                        "xsi:type": "CD"
                                    }
                                },
                                leafLevel.codeOnly
                            ]
                        }
                    },
                    dataKey: ['code.coding[0]', 'code.coding']
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
                                sharedEntryLevel.ageObservation
                            ]
                        }
                    },
                    dataKey: 'onsetQuantity'
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'REFR'
                            }
                        },
                        children: {
                            arrayContent: [
                                exports.problemStatus
                            ]
                        }
                    },
                    dataKey: 'clinicalStatus'
                }
            ]
        }
    }
};

exports.problemConcernAct = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.3'),
                h.constAttrChild('code', {
                    code: 'CONC',
                    displayName: 'Concern',
                    codeSystem: '2.16.840.1.113883.5.6',
                }),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'SUBJ'
                            }
                        },
                        children: {
                            arrayContent: [
                                exports.problemObservation
                            ]
                        }
                    }
                },
                commonTemplates.commentActivityEntryRelationship
            ]
        }
    }
};
