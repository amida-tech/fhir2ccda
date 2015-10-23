"use strict";

var _ = require('lodash');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

var h = require('../templateHelper');

exports.socialHistoryObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.38'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code,
                    },
                    dataKey: 'code.coding[0]'
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
                    dataKey: 'effectivePeriod'
                }, {
                    content: {
                        name: 'value',
                        'attr.xsi:type': 'ST',
                        text: _.identity
                    },
                    dataKey: 'valueString'
                }
            ]
        }
    },
    existsUnless: _.matchesProperty('code.coding[0].code', 'ASSERTION')
};

exports.smokingStatusObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.78'),
                h.constAttrChild('code', {
                    code: 'ASSERTION',
                    displayName: 'Assertion',
                    codeSystem: '2.16.840.1.113883.5.4',
                    codeSystemName: 'ActCode'
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
                    dataKey: 'effectivePeriod'
                }, {
                    content: {
                        name: 'value',
                        attr: {
                            assign: [{
                                    constant: {
                                        "xsi:type": "CD"
                                    }
                                },
                                leafLevel.code
                            ]
                        }
                    },
                    dataKey: 'valueCodeableConcept.coding[0]'
                }
            ]
        }
    },
    existsWhen: _.matchesProperty('code.coding[0].code', 'ASSERTION')
};
