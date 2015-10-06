"use strict";

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

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
                fieldLevel.constAttrChild('code', {
                    code: "33999-4",
                    codeSystem: "2.16.840.1.113883.6.1",
                    codeSystemName: 'LOINC',
                    displayName: 'Status'
                }),
                fieldLevel.constAttrChild('statusCode', {
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
                    dataKey: 'category.coding[0]'
                },
                fieldLevel.constAttrChild('statusCode', {
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
                                leafLevel.codeOnly
                            ]
                        }
                    },
                    dataKey: 'code.coding[0]'
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
                fieldLevel.constAttrChild('code', {
                    code: 'CONC',
                    codeSystem: '2.16.840.1.113883.5.6',
                    displayName: 'Concern'
                }),
                fieldLevel.constAttrChild('statusCode', {
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
                }
            ]
        }
    }
};
