"use strict";

var chai = require('chai');

var fs = require("fs");
var path = require('path');

var xml2jsVerify = require('xml2js');
var _ = require('lodash');

var js2xml = require('../../lib/js2xml');
var xml2js = require('../util/xml2js');

var expect = chai.expect;

describe('xml2js verification', function () {
    var generatedDir = null;
    var sampleDir = null;
    before(function () {
        sampleDir = path.join(__dirname, "../samples");
        expect(sampleDir).not.to.equal(null);
        generatedDir = path.join(__dirname, "../generated");
        try {
            fs.mkdirSync(generatedDir);
        } catch (e) {
            if (e.code !== 'EEXIST') {
                throw e;
            }
        }
        expect(generatedDir).not.to.equal(null);
    });

    var originalXml = null;
    it('read original xml', function () {
        var filepath = path.join(sampleDir, 'CCD_1.xml');
        originalXml = fs.readFileSync(filepath).toString();
        expect(originalXml).to.not.to.equal(null);
    });

    var xmlJson = null;
    it('original xml to json using xml2js', function (done) {
        xmlJson = xml2js(originalXml);
        done();
    });

    var rexml = null;
    it('regenerate xml using js2xml', function () {
        rexml = js2xml(xmlJson);
    });

    it('compare original xml to generated xml', function (done) {
        var parser = new xml2jsVerify.Parser({
            async: false,
            trim: true
        });
        parser.parseString(originalXml, function (err, originalJson) {
            if (err) {
                done(err);
            } else {
                parser.parseString(rexml, function (err, generatedJson) {
                    if (err) {
                        done(err);
                    } else {
                        expect(generatedJson).to.deep.equal(originalJson);
                        done();
                    }
                });
            }
        });
    });
});
