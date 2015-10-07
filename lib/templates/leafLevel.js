"use strict";

var _ = require('lodash');

var logger = require('../logger');
var valueSets = require('./valueSets');

exports.date = function (input) {
    var d = input.replace(/-/g, '');
    if (d.length > 8) {
        d = d.substring(0, 8);
    }
    return d;
};

exports.telecomValue = function (input) {
    if (input.value) {
        if (input.system === 'phone') {
            return 'tel:' + input.value;
        } else if (input.system === 'email') {
            return 'mailto' + input.value;
        } else {
            return input.value;
        }
    } else {
        return null;
    }

};

exports.directConcept = function (input) {
    if ((!input.system) || (input.system.substring(0, 8) !== 'urn:oid:')) {
        logger.error('unsupported system %s', input);
        return null;
    } else {
        return {
            code: input.code,
            displayName: input.display,
            codeSystem: input.system.substring(8)
        };
    }
};

var systemMap = {
    'http://www.nlm.nih.gov/research/umls/rxnorm': {
        codeSystemName: 'RxNorm',
        codeSystem: '2.16.840.1.113883.6.88'
    },
    'http://snomed.info/sct': {
        codeSystemName: 'SNOMED CT',
        codeSystem: '2.16.840.1.113883.6.96'
    },
    'http://loinc.org': {
        codeSystemName: 'LOINC',
        codeSystem: '2.16.840.1.113883.6.1'
    },
    'urn:oid:2.16.840.1.113883.3.26.1.1': {
        codeSystemName: 'Medication Route FDA',
    },
    'http://fdasis.nlm.nih.gov': {
        codeSystemName: 'UNII',
    },
    'http://hl7.org/fhir/sid/icd-9': {
        codeSystemName: 'ICD-9',
    },
    'http://ncimeta.nci.nih.gov': {
        codeSystemName: 'NCI Metathesaurus'
    }
};

exports.code = function (input) {
    var result = {};
    if (input.code) {
        result.code = input.code;
    }
    if (input.display) {
        result.displayName = input.display;
    }
    if (input.system) {
        var system = systemMap[input.system];
        if (system) {
            _.assign(result, system);
        }
    }
    return result;
};

exports.codeOnly = function (input) {
    var result = {};
    if (input.code) {
        result.code = input.code;
    }
    if (input.display) {
        result.displayName = input.display;
    }
    if (input.system) {
        var system = systemMap[input.system];
        if (system) {
            _.assign(result, system);
        }
    }
    return result;
};

exports.codeToValueSet = function (valueSetName) {
    return function (input) {
        if (typeof input !== 'string') {
            logger.error('invalid code %s for %s', input, valueSetName);
            return null;
        }
        var valueSet = valueSets[valueSetName];
        if (!valueSet) {
            logger.error('invalid value set %s', valueSetName);
            return null;
        }
        input = input.toLowerCase();
        var result = valueSet[input];
        if (!result) {
            logger.error('invalid code %s for %s', input, valueSetName);
            return null;
        }
        return result;
    };
};
