"use strict";

var expect = require('chai').expect;

var fs = require("fs");
var path = require('path');

var xml2js = require('xml2js');
var cdafhir = require('cda-fhir');

var fhir2ccda = require('../../index');
var jsonUtil = require('../util/json-transform');

describe('xml vs parse-generate xml ', function () {
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

    var ccdaRaw = null;

    it('read ccda', function () {
        var filepath = path.join(sampleDir, 'CCD_1.xml');
        ccdaRaw = fs.readFileSync(filepath).toString();
        expect(ccdaRaw).to.not.to.equal(null);
    });

    var ccdaJSONOriginal = null;

    it('ccda-json original', function (done) {
        var parser = new xml2js.Parser({
            async: false,
            explicitArray: false
        });
        parser.parseString(ccdaRaw, function (err, result) {
            ccdaJSONOriginal = result;
            var ccdaJSONOriginalJS = JSON.stringify(ccdaJSONOriginal, undefined, 4);
            var filepath = path.join(generatedDir, 'CCD_1_original.json');
            fs.writeFileSync(filepath, ccdaJSONOriginalJS);
            done(err);
        });
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
                var outFilepath = path.join(generatedDir, 'CCD_1_fhir.json');
                var fhirOut = JSON.stringify(fhir, undefined, 4);
                expect(!!fhir).to.equal(true);
                fs.writeFileSync(outFilepath, fhirOut);
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
        var filepath = path.join(generatedDir, 'CCD_1_generated.json');
        var ccdaJSONGeneratedOut = JSON.stringify(ccdaJSONGenerated, undefined, 4);
        fs.writeFileSync(filepath, ccdaJSONGeneratedOut);
        jsonUtil.delete(ccdaJSONOriginal, [
            'ClinicalDocument.id',
            'ClinicalDocument.effectiveTime',
            'ClinicalDocument.confidentialityCode',
            'ClinicalDocument.setId',
            'ClinicalDocument.recordTarget.patientRole.id',
            'ClinicalDocument.recordTarget.patientRole.addr',
            'ClinicalDocument.recordTarget.patientRole.telecom',
            'ClinicalDocument.recordTarget.patientRole.patient.name.$',
            'ClinicalDocument.recordTarget.patientRole.patient.administrativeGenderCode',
            'ClinicalDocument.recordTarget.patientRole.patient.birthTime',
            'ClinicalDocument.recordTarget.patientRole.patient.maritalStatusCode',
            'ClinicalDocument.recordTarget.patientRole.patient.religiousAffiliationCode',
            'ClinicalDocument.recordTarget.patientRole.patient.raceCode',
            'ClinicalDocument.recordTarget.patientRole.patient.ethnicGroupCode',
            'ClinicalDocument.recordTarget.patientRole.patient.guardian',
            'ClinicalDocument.recordTarget.patientRole.patient.birthplace',
            'ClinicalDocument.recordTarget.patientRole.patient.languageCommunication',
            'ClinicalDocument.recordTarget.patientRole.providerOrganization',
            'ClinicalDocument.author',
            'ClinicalDocument.dataEnterer',
            'ClinicalDocument.informant',
            'ClinicalDocument.custodian',
            'ClinicalDocument.informationRecipient',
            'ClinicalDocument.legalAuthenticator',
            'ClinicalDocument.authenticator',
            'ClinicalDocument.documentationOf',
            'ClinicalDocument.component'
        ]);
        jsonUtil.arrayize(ccdaJSONOriginal, [
            'ClinicalDocument.recordTarget.patientRole.patient.name.family'
        ]);
        var filepathOriginal = path.join(generatedDir, 'CCD_1_original_modified.json');
        var ccdaJSONOriginalJS = JSON.stringify(ccdaJSONOriginal, undefined, 4);
        fs.writeFileSync(filepathOriginal, ccdaJSONOriginalJS);
        expect(ccdaJSONGenerated).to.deep.equal(ccdaJSONOriginal);
    });

    it('fhir to ccda', function (done) {
        var ccdaGenerated = fhir2ccda.generateCCD(fhir);
        var filepath = path.join(generatedDir, 'CCD_1_generated.xml');
        fs.writeFileSync(filepath, ccdaGenerated);
        var parser = new xml2js.Parser({
            async: false,
            explicitArray: false
        });
        parser.parseString(ccdaGenerated, function (err, result) {
            if (err) {
                done(err);
            } else {
                jsonUtil.arrayize(result, [
                    'ClinicalDocument.recordTarget.patientRole.patient.name.family'
                ]);
                expect(result).to.deep.equal(ccdaJSONGenerated);
                done();
            }
        });
    });
});
