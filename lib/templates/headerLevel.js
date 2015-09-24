"use strict";

var fieldLevel = require('./fieldLevel');

var patient = {
    content: {
        name: {
            value: fieldLevel.usRealmName,
            dataKey: 'name[0]'
        }
    }
};

exports.recordTarget = {
    content: {
        'recordTarget.patientRole': {
            content: {
                patient: patient
            }
        }
    },
    dataKey: 'byType.Patient[0]'
};
