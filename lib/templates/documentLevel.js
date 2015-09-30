"use strict";

var headerLevel = require('./headerLevel');
var sectionLevel = require('./sectionLevel');

exports.ccd = {
    content: {
        ClinicalDocument: {
            assign: [{
                content: {
                    '$': {
                        constant: {
                            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                            'xmlns': 'urn:hl7-org:v3',
                            'xmlns:cda': 'urn:hl7-org:v3',
                            'xmlns:sdtc': 'urn:hl7-org:sdtc'
                        }
                    },
                    realmCode: {
                        constant: {
                            '$': {
                                code: 'US'
                            }
                        }
                    },
                    typeId: {
                        constant: {
                            '$': {
                                root: "2.16.840.1.113883.1.3",
                                extension: "POCD_HD000040"
                            }
                        }
                    },
                    templateId: {
                        constant: [{
                            '$': {
                                'root': '2.16.840.1.113883.10.20.22.1.1'
                            }
                        }, {
                            '$': {
                                'root': '2.16.840.1.113883.10.20.22.1.2'
                            }
                        }]
                    },
                    code: {
                        constant: {
                            '$': {
                                'codeSystem': '2.16.840.1.113883.6.1',
                                'codeSystemName': "LOINC",
                                'code': '34133-9',
                                'displayName': 'Summarization of Episode Note'
                            }
                        }
                    },
                    title: {
                        constant: 'Community Health and Hospitals: Health Summary'
                    },
                    languageCode: {
                        constant: {
                            '$': {
                                code: 'en-US'
                            }
                        }
                    },
                    versionNumber: {
                        constant: {
                            '$': {
                                value: '1'
                            }
                        }
                    }
                },
            }, headerLevel.recordTarget, {
                content: {
                    'component.structuredBody.component': {
                        arrayContent: [{
                            content: {
                                section: sectionLevel.allergiesSectionEntriesRequired
                            }
                        }, {
                            content: {
                                section: sectionLevel.problemsSectionEntriesRequired
                            }
                        }]
                    }
                }
            }]
        }
    }
};
