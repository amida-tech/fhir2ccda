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
