"use strict";

var sax = require('sax');
var _ = require('lodash');

var updateText = function (element, text) {
    if (element.text) {
        element.text += text;
    } else {
        element.text = text;
    }
};

var onopentag = function (elements, tag) {
    var element = elements[0];
    var newElement = {
        name: tag.name
    };
    if (!_.isEmpty(tag.attributes)) {
        newElement.attr = tag.attributes;
    }
    if (element.children) {
        element.children.push(newElement);
    } else {
        element.children = [newElement];
    }
    elements.unshift(newElement);
};

var onclosetag = function (elements) {
    elements.shift();
};

var ontext = function (elements, text) {
    if (text) {
        updateText(elements[0], text);
    }
};

var oncdata = function (elements, cdata) {
    if (cdata) {
        updateText(elements[0], cdata);
    }
};

var onerror = function (err) {
    throw err;
};

var onopentagfirst = function (result, parser, tag) {
    result.name = tag.name;
    if (!_.isEmpty(tag.attributes)) {
        result.attr = tag.attributes;
    }
    var elements = [result];

    parser.onopentag = onopentag.bind(null, elements);
    parser.onclosetag = onclosetag.bind(null, elements);
    parser.ontext = ontext.bind(null, elements);
    parser.oncdata = oncdata.bind(null, elements);
};

module.exports = function (xml) {
    if (!xml) {
        throw new Error("No XML to parse!");
    }
    xml = xml.toString().trim();
    var p = sax.parser(true, {
        trim: true
    });

    var result = {};
    p.onopentag = onopentagfirst.bind(null, result, p);
    p.onerror = onerror;

    p.write(xml);
    return result;
};
