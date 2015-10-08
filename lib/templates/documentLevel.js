"use strict";

var headerLevel = require('./headerLevel');
var sectionLevel = require('./sectionLevel');
var fieldLevel = require('./fieldLevel');

var h = require('./templateHelper');

exports.ccd = {
    content: {
        name: 'ClinicalDocument',
        attr: {
            constant: {
                'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                'xmlns': 'urn:hl7-org:v3',
                'xmlns:cda': 'urn:hl7-org:v3',
                'xmlns:sdtc': 'urn:hl7-org:sdtc'
            }
        },
        children: {
            arrayContent: [
                h.constAttrChild('realmCode', {
                    code: 'US'
                }),
                h.constAttrChild('typeId', {
                    root: "2.16.840.1.113883.1.3",
                    extension: "POCD_HD000040"
                }),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.1.1'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.1.2'),
                h.constAttrChild('code', {
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: "LOINC",
                    code: '34133-9',
                    displayName: 'Summarization of Episode Note'
                }), {
                    content: {
                        name: 'title',
                        text: 'Community Health and Hospitals: Health Summary'
                    }
                },
                h.constAttrChild('languageCode', {
                    code: 'en-US'
                }),
                h.constAttrChild('versionNumber', {
                    value: '1'
                }),
                headerLevel.recordTarget, {
                    content: {
                        name: 'component',
                        children: {
                            content: {
                                name: 'structuredBody',
                                children: {
                                    arrayContent: [
                                        h.section(sectionLevel.allergiesSectionEntriesRequired),
                                        h.section(sectionLevel.problemsSectionEntriesRequired),
                                        h.section(sectionLevel.resultsSectionEntriesRequired)
                                    ]
                                }
                            },
                            multiple: true
                        }
                    }
                }
            ]
        }
    }
};
