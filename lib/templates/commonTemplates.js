"use strict";

var sharedEntryLevel = require('./entryLevel/sharedEntryLevel');

var jsonave = require('jsonave');

var jp = jsonave.instance;

exports.commentActivityEntryRelationship = {
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
                sharedEntryLevel.commentActivity
            ]
        }
    },
    dataKey: jp('extension[?(@.url==="http://amida-tech.com/fhir/patient-note")].extension[0].valueString'),
};
