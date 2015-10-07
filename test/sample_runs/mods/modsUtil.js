"use strict";

var util = require('util');

exports.toJSONPath = function (propertyPath, postProperties) {
    var pieces = propertyPath.split('.');
    var result = pieces.reduce(function (r, p) {
        if (r) {
            r += '.';
        }
        if (p === '*') {
            r += 'children[*]';
        } else {
            r += util.format('children[?(@.name==="%s")]', p);
        }
        return r;
    }, "");
    if (postProperties) {
        result += '.' + postProperties;
    }
    return result;
};

exports.toTemplateIdSelect = function (templateId) {
    return util.format('children[?((@.name==="templateId")&&(@.attr.root==="%s"))]', templateId);
};

exports.toTemplateIdExlusion = function (templateIds) {
    var a = templateIds.reduce(function (r, t) {
        if (r) {
            r += ', ';
        }
        r += util.format('"%s"', t);
        return r;
    }, "");
    var result = util.format('children[?((@.name==="templateId")&&([%s].indexOf(@.attr.root)<0))]', a);
    return result;
};

exports.toSelect = function (property, condition) {
    return util.format('children[?((@.name==="%s")&&(%s))]', property, condition);
};

exports.toAttributeSelect = function (property, attr, value) {
    var condition = util.format('@.attr.%s==="%s"', attr, value);
    return exports.toSelect(property, condition);
};
