"use strict";

var chai = require('chai');

var fs = require("fs");
var path = require('path');

var xml2js = require('xml2js');
var cdafhir = require('cda-fhir');

var fhir2ccda = require('../../index');
var jsonUtil = require('../util/json-transform');

var expect = chai.expect;

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

    var ccdaArrayize = [
        'ClinicalDocument.recordTarget.patientRole.addr',
        'ClinicalDocument.recordTarget.patientRole.telecom',
        'ClinicalDocument.recordTarget.patientRole.addr[0].streetAddressLine',
        'ClinicalDocument.recordTarget.patientRole.patient.name.family',
        'ClinicalDocument.recordTarget.patientRole.patient.languageCommunication'
    ];

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
            'ClinicalDocument.recordTarget.patientRole.patient.name.$',
            'ClinicalDocument.recordTarget.patientRole.patient.maritalStatusCode.$.codeSystemName',
            'ClinicalDocument.recordTarget.patientRole.patient.religiousAffiliationCode.$.codeSystemName',
            'ClinicalDocument.recordTarget.patientRole.patient.raceCode.$.codeSystemName',
            'ClinicalDocument.recordTarget.patientRole.patient.ethnicGroupCode.$.codeSystemName',
            'ClinicalDocument.recordTarget.patientRole.patient.guardian',
            'ClinicalDocument.recordTarget.patientRole.patient.languageCommunication.modeCode',
            'ClinicalDocument.recordTarget.patientRole.patient.languageCommunication.proficiencyLevelCode',
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
        jsonUtil.arrayize(ccdaJSONOriginal, ccdaArrayize);
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
                jsonUtil.arrayize(result, ccdaArrayize);
                expect(result).to.deep.equal(ccdaJSONGenerated);
                done();
            }
        });
    });
});
