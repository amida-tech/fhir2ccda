"use strict";

var builder = require('xmlbuilder');

var addElements = function addElements(parent, obj) {
    if (obj.children) {
        obj.children.forEach(function (child) {
            var childObj = parent.ele(child.name, child.attr, child.text);
            addElements(childObj, child);
        });
    }
};

module.exports = exports = function (xmlJson) {
    var root = builder.create(xmlJson.name);
    root.dec('1.0', 'UTF-8', true);
    root.ins('xml-stylesheet', 'type="text/xsl" href="CDA.xsl"');
    if (xmlJson.attr) {
        root.att(xmlJson.attr);
    }
    addElements(root, xmlJson);
    return root.end({
        pretty: true,
        indent: '  ',
        newline: '\n'
    });
};
