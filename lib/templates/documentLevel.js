"use strict";

var _ = require('lodash');

var headerLevel = require('./headerLevel');
var sectionLevel = require('./sectionLevel');
var fieldLevel = require('./fieldLevel');

var h = require('./templateHelper');

exports.documentationOf = {
    content: {
        name: 'documentationOf',
        children: {
            arrayContent: [{
                content: {
                    name: 'serviceEvent',
                    'attr.classCode': 'PCPR',
                    children: {
                        content: {
                            name: 'performer',
                            'attr.typeCode': 'PRF',
                            children: {
                                arrayContent: [
                                    fieldLevel.assignedEntity
                                ]
                            }
                        },
                        dataKey: 'byType.Practitioner'
                    }
                }
            }]
        }
    },
    existsWhen: _.partialRight(_.has, 'byType.Practitioner')
};

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
                    code: '34133-9',
                    displayName: 'Summarization of Episode Note',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: "LOINC"
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
                headerLevel.recordTarget, exports.documentationOf, {
                    content: {
                        name: 'component',
                        children: {
                            content: {
                                name: 'structuredBody',
                                children: {
                                    arrayContent: [
                                        h.section(sectionLevel.allergiesSectionEntriesRequired),
                                        h.section(sectionLevel.encountersSectionEntriesOptional),
                                        h.section(sectionLevel.familyHistorySection),
                                        h.section(sectionLevel.immunizationsSectionEntriesOptional),
                                        h.section(sectionLevel.medicationSectionEntriesRequired),
                                        h.section(sectionLevel.payersSectionEntriesOptional),
                                        h.section(sectionLevel.planOfCareSection),
                                        h.section(sectionLevel.problemsSectionEntriesRequired),
                                        h.section(sectionLevel.proceduresSectionEntriesOptional),
                                        h.section(sectionLevel.resultsSectionEntriesRequired),
                                        h.section(sectionLevel.socialHistorySection),
                                        h.section(sectionLevel.vitalSignsSectionEntriesOptional)
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
