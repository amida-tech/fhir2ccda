"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var logger = require('../logger');
var valueSets = require('./valueSets');

var jp = jsonave.instance;

exports.date = function (input) {
    var d = input.replace(/-/g, '');
    if (d.length > 8) {
        d = d.substring(0, 8);
    }
    return d;
};

exports.time = function (input) {
    var d = input.replace(/-|:|T/g, '');
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
        codeSystem: '2.16.840.1.113883.6.88',
        codeSystemName: 'RxNorm'
    },
    'http://snomed.info/sct': {
        codeSystem: '2.16.840.1.113883.6.96',
        codeSystemName: 'SNOMED CT'
    },
    'http://loinc.org': {
        codeSystem: '2.16.840.1.113883.6.1',
        codeSystemName: 'LOINC'
    },
    'http://fdasis.nlm.nih.gov': {
        codeSystemName: 'UNII',
    },
    'http://hl7.org/fhir/sid/icd-9': {
        codeSystemName: 'ICD-9',
    },
    'http://ncimeta.nci.nih.gov': {
        codeSystemName: 'NCI Metathesaurus'
    },
    'http://www.ama-assn.org/go/cpt': {
        codeSystem: '2.16.840.1.113883.6.12',
        codeSystemName: 'CPT'
    },
    'http://www2a.cdc.gov/vaccines/iis/iisstandards/vaccines.asp?rpt=cvx': {
        codeSystem: '2.16.840.1.113883.12.292',
        codeSystemName: 'CVX'
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
        if (!system && input.system && (input.system.substring(0, 8) === 'urn:oid:')) {
            system = {
                codeSystem: input.system.substring(8)
            };
        }
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
