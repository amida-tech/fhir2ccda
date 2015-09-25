"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('./fieldLevel');
var leafLevel = require('./leafLevel');

var jp = jsonave.instance;

var patient = {
    content: {
        name: {
            value: fieldLevel.usRealmName,
            dataKey: 'name[0]'
        },
        'administrativeGenderCode.$': {
            content: {
                code: {
                    value: leafLevel.codeToValueSet('genderCode')
                },
                codeSystem: '2.16.840.1.113883.5.1',
                displayName: {
                    value: leafLevel.codeToValueSet('genderDisplay')
                }
            },
            dataKey: 'gender'
        },
        'birthTime.$.value': {
            value: leafLevel.date,
            dataKey: 'birthDate'
        },
        'maritalStatusCode.$': {
            content: {
                code: function (input) {
                    return input.substring(0, 1);
                },
                codeSystem: '2.16.840.1.113883.5.2',
                displayName: _.identity
            },
            dataKey: 'maritalStatus.coding[0].display'
        },
        'religiousAffiliationCode.$': {
            value: leafLevel.directConcept,
            dataKey: jp('extension[?(@.url==="http://hl7.org/fhir/StructureDefinition/us-core-religion")].valueCodeableConcept.coding[0]'),
            single: true
        },
        'raceCode.$': {
            value: leafLevel.directConcept,
            dataKey: jp('extension[?(@.url==="http://hl7.org/fhir/Profile/us-core#race")].valueCodeableConcept.coding[0]'),
            single: true
        },
        'ethnicGroupCode.$': {
            value: leafLevel.directConcept,
            dataKey: jp('extension[?(@.url==="http://hl7.org/fhir/Profile/us-core#ethnicity")].valueCodeableConcept.coding[0]'),
            single: true
        },
        'birthplace.place.addr': {
            value: fieldLevel.usRealmAddress,
            dataKey: jp('extension[?(@.url==="http://hl7.org/fhir/StructureDefinition/birthPlace")].valueAddress'),
            single: true
        },
        languageCommunication: {
            content: {
                'languageCode.$.code': {
                    dataKey: 'language.coding[0].code'
                },
                'preferenceInd.$.value': {
                    dataKey: 'preferred'
                }
            },
            dataKey: 'communication'
        }
    }
};

exports.recordTarget = {
    content: {
        'recordTarget.patientRole': {
            content: {
                id: fieldLevel.id,
                addr: {
                    value: fieldLevel.usRealmAddress,
                    dataKey: 'address'
                },
                telecom: fieldLevel.telecom,
                patient: patient
            }
        }
    },
    dataKey: 'byType.Patient[0]'
};
