"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('./fieldLevel');
var leafLevel = require('./leafLevel');

var jp = jsonave.instance;

var patient = {
    content: {
        name: 'patient',
        children: {
            arrayContent: [
                fieldLevel.usRealmName, {
                    content: {
                        name: 'administrativeGenderCode',
                        attr: {
                            content: {
                                code: {
                                    value: leafLevel.codeToValueSet('genderCode')
                                },
                                codeSystem: '2.16.840.1.113883.5.1',
                                displayName: {
                                    value: leafLevel.codeToValueSet('genderDisplay')
                                }
                            }
                        }
                    },
                    dataKey: 'gender'
                }, {
                    content: {
                        name: 'birthTime',
                        'attr.value': {
                            value: leafLevel.date
                        }
                    },
                    dataKey: 'birthDate'
                }, {
                    content: {
                        name: 'maritalStatusCode',
                        attr: {
                            content: {
                                code: function (input) {
                                    return input.substring(0, 1);
                                },
                                codeSystem: '2.16.840.1.113883.5.2',
                                displayName: _.identity
                            }
                        }
                    },
                    dataKey: 'maritalStatus.coding[0].display'
                }, {
                    content: {
                        name: 'religiousAffiliationCode',
                        attr: {
                            value: leafLevel.directConcept,
                            dataKey: jp('extension[?(@.url==="http://hl7.org/fhir/StructureDefinition/us-core-religion")].valueCodeableConcept.coding[0]'),
                            single: true
                        }
                    }
                }, {
                    content: {
                        name: 'raceCode',
                        attr: {
                            value: leafLevel.directConcept,
                            dataKey: jp('extension[?(@.url==="http://hl7.org/fhir/StructureDefinition/us-core-race")].valueCodeableConcept.coding[0]'),
                            single: true
                        }
                    }
                }, {
                    content: {
                        name: 'ethnicGroupCode',
                        attr: {
                            value: leafLevel.directConcept,
                            dataKey: jp('extension[?(@.url==="http://hl7.org/fhir/StructureDefinition/us-core-ethnicity")].valueCodeableConcept.coding[0]'),
                            single: true
                        }
                    }
                }, {
                    content: {
                        name: 'birthplace',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'place',
                                    children: {
                                        arrayContent: [
                                            fieldLevel.usRealmAddress('addr'),
                                        ]
                                    }
                                }
                            }]
                        }
                    },
                    dataKey: jp('extension[?(@.url==="http://hl7.org/fhir/StructureDefinition/birthPlace")].valueAddress')
                }, {
                    content: {
                        name: 'languageCommunication',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'languageCode',
                                    'attr.code': _.identity
                                },
                                dataKey: 'language.coding[0].code'
                            }, {
                                content: {
                                    name: 'preferenceInd',
                                    'attr.value': _.identity
                                },
                                dataKey: 'preferred'
                            }]
                        }
                    },
                    dataKey: 'communication'
                }
            ]
        }
    }
};

exports.recordTarget = {
    content: {
        name: 'recordTarget',
        children: {
            content: {
                name: 'patientRole',
                children: {
                    arrayContent: [
                        fieldLevel.id,
                        fieldLevel.usRealmAddress('addr', 'address'),
                        fieldLevel.telecom,
                        patient
                    ]
                }
            },
            multiple: true
        }
    },
    dataKey: 'byType.Patient[0]'
};
