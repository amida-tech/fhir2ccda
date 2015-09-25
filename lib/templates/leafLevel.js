"use strict";

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
        var result = valueSet[input];
        if (!result) {
            logger.error('invalid code %s for %s', input, valueSetName);
            return null;
        }
        return result;
    };
};
