"use strict";

var chai = require('chai');

var fs = require("fs");
var path = require('path');

var xml2js = require('xml2js');
var cdafhir = require('cda-fhir');
var _ = require('lodash');

var fhir2ccda = require('../../index');
var jsonUtil = require('../util/json-transform');

var expect = chai.expect;

var actionInfos = [{
    path: 'ClinicalDocument.component.structuredBody.component',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.component.structuredBody.component[*]..templateId',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.component.structuredBody.component[*]..entryRelationship',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.component.structuredBody.component[*]..originalText',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.id',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.effectiveTime',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.confidentialityCode',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.setId',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.name["$"]',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.maritalStatusCode["$"].codeSystemName',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.religiousAffiliationCode["$"].codeSystemName',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.raceCode["$"].codeSystemName',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.ethnicGroupCode["$"].codeSystemName',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.guardian',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.languageCommunication.modeCode',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.languageCommunication.proficiencyLevelCode',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.providerOrganization',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.author',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.dataEnterer',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.informant',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.custodian',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.informationRecipient',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.legalAuthenticator',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.authenticator',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.documentationOf',
    actionKey: 'delete'
}, {
    path: 'ClinicalDocument.component.structuredBody.component[*]',
    actionKey: 'filter',
    filterPath: 'section.templateId[*]["$"].root',
    values: ['2.16.840.1.113883.10.20.22.2.6.1'],
    parentPath: 'ClinicalDocument.component.structuredBody',
    property: 'component'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.addr',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.telecom',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.addr[0].streetAddressLine',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.name.family',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.recordTarget.patientRole.patient.languageCommunication',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.component.structuredBody.component[*].section.templateId[?(@["$"].root==="2.16.840.1.113883.10.20.22.2.6.1")].^.^',
    actionKey: 'root',
    children: [{
        path: 'title',
        actionKey: 'delete'
    }, {
        path: 'text',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.effectiveTime',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.id',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.id',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.effectiveTime',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.value',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.entryRelationship[*]',
        actionKey: 'filter2',
        filterPath: 'observation.templateId[*]["$"].root',
        values: ['2.16.840.1.113883.10.20.22.4.28'],
        parentPath: 'entry[*].act.entryRelationship[*].observation',
        property: 'entryRelationship'
    }]
}];

var actionInfosGenerated = [{
    path: 'ClinicalDocument.component.structuredBody.component[*]..entryRelationship',
    actionKey: 'arrayize'
}, {
    path: 'ClinicalDocument.component.structuredBody.component[*].section.templateId[?(@["$"].root==="2.16.840.1.113883.10.20.22.2.6.1")].^.^',
    actionKey: 'root',
    children: [{
        path: 'code["$"].displayName',
        actionKey: 'delete'
    }, {
        path: 'code["$"].codeSystemName',
        actionKey: 'delete'
    }, {
        path: 'title',
        actionKey: 'delete'
    }]
}];

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
            jsonUtil.transform(ccdaJSONOriginal, actionInfos);
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

        var filepathOriginal = path.join(generatedDir, 'CCD_1_original_modified.json');
        var ccdaJSONOriginalJS = JSON.stringify(ccdaJSONOriginal, undefined, 4);
        fs.writeFileSync(filepathOriginal, ccdaJSONOriginalJS);

        var ccdaJSONGeneratedMod = _.cloneDeep(ccdaJSONGenerated);
        jsonUtil.transform(ccdaJSONGeneratedMod, actionInfosGenerated);
        expect(ccdaJSONGeneratedMod).to.deep.equal(ccdaJSONOriginal);
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
                var actionInfosArrayize = _.filter(actionInfos, function (actionInfo) {
                    return actionInfo.actionKey === 'arrayize';
                });
                jsonUtil.transform(result, actionInfosArrayize);
                jsonUtil.transform(ccdaJSONGenerated, actionInfosArrayize);
                expect(result).to.deep.equal(ccdaJSONGenerated);
                done();
            }
        });
    });
});
