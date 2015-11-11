"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var commonTemplates = require('../commonTemplates');
var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

var jp = jsonave.instance;

exports.encounterActivities = {
    content: {
        name: 'encounter',
        attr: {
            constant: {
                classCode: 'ENC',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId("2.16.840.1.113883.10.20.22.4.49"),
                fieldLevel.id2, {
                    content: {
                        name: 'code',
                        attr: {
                            value: leafLevel.code,
                            dataKey: 'coding[0]'
                        },
                        children: {
                            content: {
                                name: 'translation',
                                attr: leafLevel.code
                            },
                            dataKey: jp('coding[1:]')
                        }
                    },
                    dataKey: 'type[0]'
                }, {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': {
                            value: leafLevel.time,
                            dataKey: 'start',
                            existsWhen: function (input) {
                                return input.start && input.end && (input.start === input.end);
                            }
                        }
                    },
                    dataKey: 'period'
                }, {
                    value: fieldLevel.performer,
                    dataKey: jp('participant[0].individual.reference.getById()')
                }, {
                    content: {
                        name: 'participant',
                        attr: {
                            constant: {
                                typeCode: 'LOC'
                            }
                        },
                        children: {
                            arrayContent: [{
                                value: sharedEntryLevel.serviceDeliveryLocation,
                                dataKey: jp('location[0].location.reference.getById()')
                            }]
                        }
                    },
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'RSON'
                            }
                        },
                        children: {
                            arrayContent: [
                                sharedEntryLevel.indication
                            ]
                        }
                    },
                    dataKey: 'reason[0]',
                    dataTransform: function (input) {
                        return {
                            category: {
                                coding: [{
                                    code: '404684003',
                                    display: 'Finding',
                                    system: 'http://snomed.info/sct'
                                }]
                            },
                            code: {
                                coding: input.coding
                            }
                        };
                    }
                },
                commonTemplates.commentActivityEntryRelationship
            ]
        }
    }
};
