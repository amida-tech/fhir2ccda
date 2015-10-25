"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

var jp = jsonave.instance;

exports.nonMedicalSupplyActivity = {
    content: {
        name: 'supply',
        attr: {
            constant: {
                classCode: 'SPLY',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.50'),
                fieldLevel.id,
                fieldLevel.statusCodeCompleted, {
                    content: {
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'quantity'
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'participant',
                        'attr.typeCode': 'PRD',
                        children: {
                            arrayContent: [
                                sharedEntryLevel.productInstance
                            ]
                        }
                    }
                }
            ]
        }
    }
};
