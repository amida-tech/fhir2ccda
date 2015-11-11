"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var commonTemplates = require('../commonTemplates');

var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

var jp = jsonave.instance;

var vitalSignObservation = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.27'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'code.coding[0]'
                },
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time
                    },
                    dataKey: 'effectiveDateTime'
                }, {
                    content: {
                        name: 'value',
                        attr: {
                            content: {
                                'xsi:type': 'PQ',
                                value: {
                                    dataKey: 'value'
                                },
                                unit: {
                                    dataKey: 'unit'
                                }
                            }
                        }
                    },
                    dataKey: 'valueQuantity'
                }, {
                    content: {
                        name: 'interpretationCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'interpretation.coding[0]'
                }
            ]
        }
    }
};

exports.vitalSignsOrganizer = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.26'), {
                    content: {
                        name: 'code',
                        attr: {
                            constant: {
                                code: '46680005',
                                displayName: 'Vital signs',
                                codeSystem: '2.16.840.1.113883.6.96',
                                codeSystemName: 'SNOMED CT'
                            }
                        }
                    }
                },
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time
                    },
                    dataKey: 'components[0].effectiveDateTime'
                }, {
                    content: {
                        name: 'component',
                        children: {
                            arrayContent: [
                                vitalSignObservation
                            ]
                        }
                    },
                    dataKey: 'components'
                },
                commonTemplates.commentActivityEntryRelationship
            ]
        }
    }
};
