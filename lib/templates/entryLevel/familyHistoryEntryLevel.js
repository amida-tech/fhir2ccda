"use strict";

var _ = require('lodash');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

var h = require('../templateHelper');

var sharedEntryLevel = require('./sharedEntryLevel');

exports.familyHistoryDeathObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.47'),
                h.constAttrChild('code', {
                    code: 'ASSERTION',
                    displayName: 'Assertion',
                    codeSystem: '2.16.840.1.113883.5.4',
                    codeSystemName: 'ActCode'
                }),
                fieldLevel.statusCodeCompleted,
                h.constAttrChild('value', {
                    'xsi:type': "CD",
                    code: '419099009',
                    displayName: 'Dead',
                    codeSystem: '2.16.840.1.113883.6.96',
                    codeSystemName: 'SNOMED CT'
                })
            ]
        }
    }
};

exports.familyHistoryObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.46'),
                fieldLevel.id, {
                    content: {
                        name: 'code',
                        attr: fieldLevel.code
                    },
                    dataKey: 'TBD',
                    default: {
                        name: 'code',
                        attr: {
                            code: '64572001',
                            displayName: 'Condition',
                            codeSystem: '2.16.840.1.113883.6.96',
                            codeSystemName: 'SNOMED CT'
                        }
                    }
                },
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'value',
                        attr: {
                            assign: [{
                                    constant: {
                                        'xsi:type': 'CD'
                                    }
                                },
                                leafLevel.code
                            ]
                        }
                    },
                    dataKey: 'code.coding[0]'
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
                                typeCode: 'CAUS'
                            }
                        },
                        children: {
                            arrayContent: [
                                exports.familyHistoryDeathObservation
                            ]
                        }
                    },
                    existsWhen: _.matchesProperty('outcome.coding[0].code', '419099009')
                }
            ]
        }
    }

};

exports.familyHistoryOrganizer = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.45'),
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'subject',
                        children: {
                            content: {
                                name: 'relatedSubject',
                                'attr.classCode': 'PRS',
                                children: {
                                    arrayContent: [{
                                        content: {
                                            name: 'code',
                                            attr: leafLevel.code
                                        },
                                        dataKey: 'relationship[0].coding[0]'
                                    }, {
                                        content: {
                                            name: 'subject',
                                            children: {
                                                arrayContent: [
                                                    fieldLevel.administrativeGenderCode, {
                                                        content: {
                                                            name: 'birthTime',
                                                            'attr.value': leafLevel.time
                                                        },
                                                        dataKey: 'bornDate'
                                                    }
                                                ]
                                            }
                                        }
                                    }]
                                }
                            },
                            multiple: true
                        }
                    }
                }, {
                    content: {
                        name: 'component',
                        children: {
                            arrayContent: [
                                exports.familyHistoryObservation
                            ]
                        }
                    },
                    dataKey: 'condition'
                }
            ]
        }
    }
};
