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
        displayName: 'Active',
        code: '55561003',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    suspected: {
        displayName: 'Active',
        code: '55561003',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    confirmed: {
        displayName: 'Active',
        code: '55561003',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    inactive: {
        displayName: 'Inactive',
        code: '73425007',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    refuted: {
        displayName: 'Resolved',
        code: '413322009',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    resolved: {
        displayName: 'Resolved',
        code: '413322009',
        codeSystem: '2.16.840.1.113883.6.96'
    }
};

valueSets.conditionClinical = {
    active: {
        code: '55561003',
        codeSystem: '2.16.840.1.113883.6.96',
        displayName: 'Active',
        'xsi:type': 'CD'
    },
    relapse: {
        code: '73425007',
        codeSystem: '2.16.840.1.113883.6.96',
        displayName: 'Inactive',
        'xsi:type': 'CD'
    },
    remission: {
        code: '73425007',
        codeSystem: '2.16.840.1.113883.6.96',
        displayName: 'Inactive',
        'xsi:type': 'CD'
    },
    resolved: {
        code: '413322009',
        codeSystem: '2.16.840.1.113883.6.96',
        displayName: 'Resolved',
        'xsi:type': 'CD'
    },
    completed: { // temporary to be removed after cda-fhir is fixed
        code: '413322009',
        codeSystem: '2.16.840.1.113883.6.96',
        displayName: 'Resolved',
        'xsi:type': 'CD'
    }
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
