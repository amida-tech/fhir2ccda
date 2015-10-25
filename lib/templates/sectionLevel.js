"use strict";

var _ = require('lodash');

var entryLevel = require('./entryLevel');
var fieldLevel = require('./fieldLevel');
var leafLevel = require('./leafLevel');

var h = require('./templateHelper');

exports.allergiesSectionEntriesRequired = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.6'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.6.1'),
                h.constAttrChild('code', {
                    code: "48765-2",
                    displayName: 'Allergies, adverse reactions, alerts',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: "LOINC"
                }), {
                    content: {
                        name: 'title',
                        text: 'Allergies, adverse reactions, alerts'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.allergyProblemAct
                            ]
                        }
                    },
                    dataKey: 'byType.allergy'
                }
            ]
        }
    }
};

exports.medicationSectionEntriesRequired = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.1'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.1.1'),
                h.constAttrChild('code', {
                    code: '10160-0',
                    displayName: 'History of medication use',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'History of medication use'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.medicationActivity
                            ]
                        }
                    },
                    dataKey: 'byType.medication'
                }
            ]
        }
    }
};

exports.immunizationsSectionEntriesOptional = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.2'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.2.1'),
                h.constAttrChild('code', {
                    code: '11369-6',
                    displayName: 'Immunizations',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Immunizations'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.immunizationActivity
                            ]
                        }
                    },
                    dataKey: 'byType.immunization'
                }

            ]
        }
    }
};

exports.problemsSectionEntriesRequired = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.5'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.5.1'),
                h.constAttrChild('code', {
                    code: "11450-4",
                    displayName: 'Problem List',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: "LOINC"
                }), {
                    content: {
                        name: 'title',
                        text: 'Problem List'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.problemConcernAct
                            ]
                        }
                    },
                    dataKey: 'byType.problem'
                }

            ]
        }
    }
};

exports.resultsSectionEntriesRequired = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.3'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.3.1'),
                h.constAttrChild('code', {
                    code: '30954-2',
                    displayName: 'Relevant diagnostic tests and/or laboratory data',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Relevant diagnostic tests and/or laboratory data'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.resultOrganizer
                            ]
                        }
                    },
                    dataKey: 'byType.result'
                }

            ]
        }
    }
};

exports.encountersSectionEntriesOptional = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.22'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.22.1'),
                h.constAttrChild('code', {
                    code: '46240-8',
                    displayName: 'Encounters',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Encounters'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.encounterActivities
                            ]
                        }
                    },
                    dataKey: 'byType.encounter'
                }

            ]
        }
    }
};

exports.proceduresSectionEntriesOptional = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.7'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.7.1'),
                h.constAttrChild('code', {
                    code: '47519-4',
                    displayName: 'History of Procedures',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Procedures'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.procedureActivityAct,
                                entryLevel.procedureActivityProcedure,
                                entryLevel.procedureActivityObservation
                            ]
                        }
                    },
                    dataKey: 'byType.procedure'
                }

            ]
        }
    }
};

exports.vitalSignsSectionEntriesOptional = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.4'),
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.4.1'),
                h.constAttrChild('code', {
                    code: '8716-3',
                    displayName: 'Vital Signs',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Vital Signs'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.vitalSignsOrganizer
                            ]
                        }
                    },
                    dataKey: 'byType.vitalSign'
                }

            ]
        }
    }
};

exports.payersSectionEntriesOptional = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.18'),
                h.constAttrChild('code', {
                    code: '48768-6',
                    displayName: 'Payers',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Payers'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.coverageActivity
                            ]
                        }
                    },
                    dataKey: 'byType.payer'
                }

            ]
        }
    }
};

exports.socialHistorySection = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.17'),
                h.constAttrChild('code', {
                    code: '29762-2',
                    displayName: 'Social History',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Social History'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.smokingStatusObservation,
                                entryLevel.socialHistoryObservation
                            ]
                        }
                    },
                    dataKey: 'byType.socialHistory'
                }
            ]
        }
    }
};

exports.planOfCareSection = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.10'),
                h.constAttrChild('code', {
                    code: '18776-5',
                    displayName: 'Plan of Care',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Plan of Care'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                //        entryLevel.planOfCareActivityAct,
                                //        entryLevel.planOfCareActivityObservation,
                                entryLevel.planOfCareActivityProcedure //,
                                //        entryLevel.planOfCareActivityEncounter,
                                //        entryLevel.planOfCareActivitySubstanceAdministration,
                                //        entryLevel.planOfCareActivitySupply,
                                //        entryLevel.planOfCareActivityInstructions
                            ]
                        }
                    },
                    dataKey: 'byType.planOfCare'
                }
            ]
        }
    }
};

exports.familyHistorySection = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.15'),
                h.constAttrChild('code', {
                    code: '10157-6',
                    displayName: 'Family History',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Family History'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.familyHistoryOrganizer
                            ]
                        }
                    },
                    dataKey: 'byType.familyHistory'
                }
            ]
        }
    }
};

exports.functionalStatusSection = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.14'),
                h.constAttrChild('code', {
                    code: '47420-5',
                    displayName: 'Functional Status',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Functional Status'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.functionalStatusResultOrganizer,
                                entryLevel.cognitiveStatusResultOrganizer
                            ]
                        }
                    },
                    dataKey: 'byType.functionalStatus'
                }
            ]
        }
    }
};

exports.medicalEquipmentSection = {
    content: {
        name: 'section',
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.2.23'),
                h.constAttrChild('code', {
                    code: '46264-8',
                    displayName: 'Medical Equipment',
                    codeSystem: '2.16.840.1.113883.6.1',
                    codeSystemName: 'LOINC'
                }), {
                    content: {
                        name: 'title',
                        text: 'Medical Equipment'
                    }
                }, {
                    content: {
                        name: 'entry',
                        attr: {
                            constant: {
                                typeCode: 'DRIV'
                            }
                        },
                        children: {
                            arrayContent: [
                                entryLevel.nonMedicalSupplyActivity,
                                entryLevel.cognitiveStatusResultOrganizer
                            ]
                        }
                    },
                    dataKey: 'byType.medicalEquipment'
                }
            ]
        }
    }
};
