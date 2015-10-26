"use strict";

var chai = require('chai');

var fs = require("fs");
var path = require('path');

var cdafhir = require('cda-fhir');
var _ = require('lodash');

var fhir2ccda = require('../../index');
var jsonUtil = require('../util/json-transform');
var xml2js = require('../util/xml2js');

var expect = chai.expect;

var actionInfos = require('./mods/CCD_1_mods');
var actionInfosGenerated = require('./mods/CCD_1_gen_mods');

describe('xml vs parse-generate xml ', function () {
    var generatedDir = null;
    var sampleDir = null;

    var writeDebugFile = function (filename, content) {
        var filepath = path.join(generatedDir, filename);
        if (filename.split('.')[1] === 'json') {
            content = JSON.stringify(content, undefined, 4);
        }
        fs.writeFileSync(filepath, content);
    };

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

    var ccdaRaw = null;
    it('read ccda', function () {
        var filepath = path.join(sampleDir, 'CCD_1.xml');
        ccdaRaw = fs.readFileSync(filepath).toString();
        expect(ccdaRaw).to.not.to.equal(null);
    });

    var ccdaJSONOriginal = null;
    it('ccda-json original', function () {
        ccdaJSONOriginal = xml2js(ccdaRaw);
        expect(ccdaJSONOriginal).to.not.to.equal(null);
        writeDebugFile('CCD_1_original.json', ccdaJSONOriginal);

        jsonUtil.transform(ccdaJSONOriginal, actionInfos);
        writeDebugFile('CCD_1_original_modified.json', ccdaJSONOriginal);
    });

    var fhir = null;
    it('ccda-json original to fhir', function (done) {
        var filepath = path.join(sampleDir, 'CCD_1.xml');
        var istream = fs.createReadStream(filepath, 'utf-8');

        expect(!!istream).to.equal(true);

        istream
            .pipe(new cdafhir.CcdaParserStream())
            .on('data', function (data) {
                fhir = data;
                expect(!!fhir).to.equal(true);
                writeDebugFile('CCD_1_fhir.json', fhir);
            })
            .on('finish', function () {
                done();
            })
            .on('error', function (err) {
                done(err);
            });
    });

    var ccdaJSONGenerated = null;
    it('fhir to ccda-json', function () {
        ccdaJSONGenerated = fhir2ccda.generateCCD(fhir, {
            json: true
        });
        writeDebugFile('CCD_1_generated.json', ccdaJSONGenerated);

        var ccdaJSONGeneratedMod = _.cloneDeep(ccdaJSONGenerated);
        jsonUtil.transform(ccdaJSONGeneratedMod, actionInfosGenerated);
        writeDebugFile('CCD_1_generated_modified.json', ccdaJSONGeneratedMod);

        expect(ccdaJSONGeneratedMod).to.deep.equal(ccdaJSONOriginal);
    });

    it('verify api for xml output', function () {
        var ccdaGenerated = fhir2ccda.generateCCD(fhir);
        writeDebugFile('CCD_1_generated.xml', ccdaGenerated);

        var ccdaJSONRegenerated = xml2js(ccdaGenerated);
        expect(ccdaJSONRegenerated).to.deep.equal(ccdaJSONGenerated);
    });

    var fhirRE = null;
    it('ccda generated to fhir and compare', function (done) {
        var filepath = path.join(generatedDir, 'CCD_1_generated.xml');
        var istream = fs.createReadStream(filepath, 'utf-8');

        expect(!!istream).to.equal(true);

        istream
            .pipe(new cdafhir.CcdaParserStream())
            .on('data', function (data) {
                fhirRE = data;
                expect(!!fhirRE).to.equal(true);
                writeDebugFile('CCD_1_fhir_RE.json', fhirRE);
            })
            .on('finish', function () {
                done();
            })
            .on('error', function (err) {
                done(err);
            });
    });
});
