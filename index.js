"use strict";

var engine = require('./lib/engine');
var documentLevel = require('./lib/templates/documentLevel');

exports.generate = function (template, bundle, options) {
    return engine.generate(template, bundle, options);
};

exports.generateCCD = function (bundle, options) {
    return exports.generate(documentLevel.ccd, bundle, options);
};
