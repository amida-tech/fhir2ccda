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

var actionInfos = [{
    path: 'children[?(@.name==="id")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="effectiveTime")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="confidentialityCode")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="setId")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="author")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="dataEnterer")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="informant")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="custodian")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="informationRecipient")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="legalAuthenticator")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="authenticator")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="documentationOf")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="recordTarget")].children[?(@.name==="patientRole")]',
    actionKey: 'root',
    children: [{
        path: 'children[?(@.name==="patient")].children[?(@.name==="name")].attr',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="patient")].children[?(@.name==="maritalStatusCode")].attr.codeSystemName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="patient")].children[?(@.name==="religiousAffiliationCode")].attr.codeSystemName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="patient")].children[?(@.name==="raceCode")].attr.codeSystemName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="patient")].children[?(@.name==="ethnicGroupCode")].attr.codeSystemName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="patient")].children[?(@.name==="guardian")]',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="patient")].children[?(@.name==="languageCommunication")].children[?(@.name==="modeCode")]',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="patient")].children[?(@.name==="languageCommunication")].children[?(@.name==="proficiencyLevelCode")]',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="providerOrganization")]',
        actionKey: 'delete'
    }]
}, {
    path: 'children[?(@.name==="component")]..children[?(@.name==="originalText")]',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="component")].children[*].children[*].children[*].children[?((@.name==="templateId")&&(["2.16.840.1.113883.10.20.22.2.6", "2.16.840.1.113883.10.20.22.2.6.1", "2.16.840.1.113883.10.20.22.2.5x", "2.16.840.1.113883.10.20.22.2.5.1x"].indexOf(@.attr.root)<0))].^.^.^.^',
    actionKey: 'delete'
}, {
    path: 'children[?(@.name==="component")].children[*].children[*].children[*].children[?((@.name==="templateId")&&(@.attr.root==="2.16.840.1.113883.10.20.22.2.6.1"))].^.^',
    actionKey: 'root',
    children: [{
        path: 'children[?(@.name==="title")]',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="text")]',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="entry")].children[?(@.name==="act")]',
        actionKey: 'root',
        children: [{
            path: 'children[?(@.name==="id")]',
            actionKey: 'delete'
        }, {
            path: 'children[?(@.name==="effectiveTime")]',
            actionKey: 'delete'
        }, {
            path: 'children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="id")]',
            actionKey: 'delete'
        }, {
            path: 'children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="effectiveTime")]',
            actionKey: 'delete'
        }, {
            path: 'children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="value")]',
            actionKey: 'delete'
        }, {
            path: 'children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?((@.name==="templateId")&&(@.attr.root!=="2.16.840.1.113883.10.20.22.4.28"))].^.^.^.^',
            actionKey: 'delete'
        }, {
            path: 'entry[*].act.entryRelationship[*].observation.entryRelationship[*].observation.templateId[*]["$"][?(@==="2.16.840.1.113883.10.20.22.4.9")].^.^.^.^',
            actionKey: 'root',
            children: [{
                path: 'id',
                actionKey: 'delete'
            }, {
                path: 'text',
                actionKey: 'delete'
            }, {
                path: 'entryRelationship',
                actionKey: 'delete'
            }]
        }]
    }]
}, {
    path: 'ClinicalDocument.component.structuredBody.component[*].section.templateId[?(@["$"].root==="2.16.840.1.113883.10.20.22.2.5")].^.^',
    actionKey: 'root',
    children: [{
        path: 'code["$"].displayName',
        actionKey: 'delete'
    }, {
        path: 'title',
        actionKey: 'delete'
    }, {
        path: 'text',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.id',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.effectiveTime',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.value[?(@.code==="195967001")].^.^.^.^.^.^',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.text',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.effectiveTime',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.id',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.entryRelationship[?(@.observation.code["$"].displayName!=="Status")]',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.entryRelationship[*].observation.effectiveTime',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.entryRelationship[*].observation.id',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.entryRelationship[*].observation.text',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.code',
        actionKey: 'delete',
    }]
}];

var actionInfosGenerated = [{
    path: 'children[?(@.name==="component")].children[*].children[*].children[*].children[?((@.name==="templateId")&&(@.attr.root==="2.16.840.1.113883.10.20.22.2.6.1"))].^.^',
    actionKey: 'root',
    children: [{
        path: 'children[?(@.name==="code")].attr.displayName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="code")].attr.codeSystemName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="title")]',
        actionKey: 'delete'
    }]
}, {
    path: 'ClinicalDocument.component.structuredBody.component[*].section.templateId[?(@["$"].root==="2.16.840.1.113883.10.20.22.2.5")].^.^',
    actionKey: 'root',
    children: [{
        path: 'code["$"].displayName',
        actionKey: 'delete'
    }, {
        path: 'title',
        actionKey: 'delete'
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.value[?(@.code==="CONC")].^.^.^.^.^.^',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.value["$"].codeSystemName',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.entryRelationship[*].observation.code["$"].codeSystemName',
        actionKey: 'delete',
    }, {
        path: 'entry[*].act.entryRelationship[*].observation.code',
        actionKey: 'delete',
    }]
}];

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

        jsonUtil.transform(ccdaJSONGenerated, actionInfosGenerated);
        writeDebugFile('CCD_1_generated_modified.json', ccdaJSONGenerated);

        expect(ccdaJSONGenerated).to.deep.equal(ccdaJSONOriginal);
    });

    xit('fhir to ccda', function (done) {
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
