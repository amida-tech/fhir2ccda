"use strict";

var valueSets = module.exports = {};

valueSets.genderDisplay = {
    'female': 'Female',
    'male': 'Male',
    'other': 'Undifferentiated',
    'unknown': 'Undifferentiated'
};

valueSets.genderCode = Object.keys(valueSets.genderDisplay).reduce(function (r, gender) {
    var display = valueSets.genderDisplay[gender];
    r[gender] = display.substring(0, 1);
    return r;
}, {});

valueSets.addressUse = {
    home: 'HP',
    work: 'WP',
    temp: 'TMP',
    old: 'BAD'
};

valueSets.phoneUse = {
    home: 'HP',
    work: 'WP',
    mobile: 'MC'
};

valueSets.problemActStatusCode = {
    active: 'active',
    unconfirmed: 'active',
    confirmed: 'active',
    inactive: 'active', // To be fixed
    resolved: 'completed',
    refuted: 'aborted',
    'entered-in-error': 'aborted'
};

valueSets.sensitivityStatus = {
    active: {
        code: '55561003',
        displayName: 'Active',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    suspected: {
        code: '55561003',
        displayName: 'Active',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    confirmed: {
        code: '55561003',
        displayName: 'Active',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    inactive: {
        code: '73425007',
        displayName: 'Inactive',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    refuted: {
        code: '413322009',
        displayName: 'Resolved',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    resolved: {
        code: '413322009',
        displayName: 'Resolved',
        codeSystem: '2.16.840.1.113883.6.96'
    }
};

valueSets.conditionClinical = {
    active: {
        'xsi:type': 'CD',
        code: '55561003',
        displayName: 'Active',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    relapse: {
        'xsi:type': 'CD',
        code: '73425007',
        displayName: 'Inactive',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    remission: {
        'xsi:type': 'CD',
        code: '73425007',
        displayName: 'Inactive',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    resolved: {
        'xsi:type': 'CD',
        code: '413322009',
        displayName: 'Resolved',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    completed: { // temporary to be removed after cda-fhir is fixed
        'xsi:type': 'CD',
        code: '413322009',
        displayName: 'Resolved',
        codeSystem: '2.16.840.1.113883.6.96'
    }
};

valueSets.procedureStatus = {
    'in-progress': 'active',
    'aborted': 'aborted',
    'completed': 'completed',
    'entered-in-error': 'cancelled'
};

valueSets.reactionSeverity = {
    severe: {
        code: '24484000',
        displayName: 'Severe',
        codeSystem: '2.16.840.1.113883.6.96',
        codeSystemName: 'SNOMED CT'
    },
    moderate: {
        code: '6736007',
        displayName: 'Moderate',
        codeSystem: '2.16.840.1.113883.6.96',
        codeSystemName: 'SNOMED CT'
    },
    mild: {
        code: '255604002',
        displayName: 'Mild',
        codeSystem: '2.16.840.1.113883.6.96',
        codeSystemName: 'SNOMED CT'
    }
};
