"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

var jp = jsonave.instance;

var medicationInformation = {
    content: {
        name: 'manufacturedProduct',
        attr: {
            constant: {
                classCode: 'MANU'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.23'), {
                    content: {
                        name: 'manufacturedMaterial',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'code',
                                    attr: leafLevel.code
                                }
                            }]
                        }
                    },
                    dataKey: 'code.coding[0]'
                }, {
                    content: {
                        name: 'manufacturerOrganization',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'name',
                                    text: _.identity
                                },
                                dataKey: 'name'
                            }]
                        }
                    },
                    dataKey: jp('manufacturer.reference.getById()')
                }
            ]
        }
    }
};

var medicationSupplyOrder = {
    content: {
        name: 'supply',
        attr: {
            constant: {
                classCode: 'SPLY',
                moodCode: 'INT'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.17'),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        'attr.xsi:type': 'IVL_TS',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'low',
                                    'attr.value': leafLevel.time
                                },
                                dataKey: 'start'
                            }]
                        }
                    },
                    dataKey: 'dispenseRequest.validityPeriod'
                }, {
                    content: {
                        name: 'repeatNumber',
                        'attr.value': String
                    },
                    dataKey: 'dispenseRequest.numberOfRepeatsAllowed'
                }, {
                    content: {
                        name: 'quantity',
                        'attr.value': String
                    },
                    dataKey: 'dispenseRequest.quantity.value'
                }, {
                    content: {
                        name: 'product',
                        children: {
                            arrayContent: [
                                medicationInformation
                            ]
                        }
                    },
                    dataKey: jp('medicationReference.reference.getById()')
                }, {
                    value: fieldLevel.author,
                    dataKey: jp('prescriber.reference.getById()')
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'SUBJ',
                                inversionInd: 'true'
                            }
                        },
                        children: {
                            arrayContent: [
                                sharedEntryLevel.instructions
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    }
};

var medicationDispense = {
    content: {
        name: 'supply',
        attr: {
            constant: {
                classCode: 'SPLY',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.17'),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime'
                    }
                }, {
                    content: {
                        name: 'product',
                        children: {
                            arrayContent: [
                                medicationInformation
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    }
};

exports.medicationActivity = {
    content: {
        name: 'substanceAdministration',
        attr: {
            content: {
                classCode: 'SBADM',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.16'), {
                    content: {
                        name: 'text',
                        text: _.identify
                    },
                    dataKey: 'TBD'
                },
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        attr: {
                            constant: {
                                'xsi:type': 'IVL_TS'
                            }
                        },
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'low',
                                    'attr.value': leafLevel.time
                                },
                                dataKey: 'start'
                            }, {
                                content: {
                                    name: 'high',
                                    'attr.value': leafLevel.time
                                },
                                dataKey: 'end'
                            }]
                        }
                    },
                    dataKey: 'effectiveTimePeriod'
                }, {
                    content: {
                        name: 'effectiveTime',
                        attr: {
                            constant: {
                                'xsi:type': 'PIVL_TS',
                                'institutionSpecified': 'true',
                                'operator': 'A'
                            }
                        },
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'period',
                                    attr: {
                                        content: {
                                            value: {
                                                dataKey: 'period'
                                            },
                                            unit: {
                                                dataKey: 'periodUnits'
                                            }
                                        }
                                    }
                                },
                            }]
                        }
                    },
                    dataKey: jp('prescription.reference.getById().dosageInstruction[0].timing.repeat')
                }, {
                    content: {
                        name: 'routeCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'dosage.route.coding[0]'
                }, {
                    content: {
                        name: 'doseQuantity',
                        attr: {
                            content: {
                                value: {
                                    value: String,
                                    dataKey: 'value'
                                },
                                unit: {
                                    dataKey: 'unit'
                                }
                            }
                        }
                    },
                    dataKey: 'dosage.quantity'
                }, {
                    content: {
                        name: 'rateQuantity',
                        attr: {
                            content: {
                                value: {
                                    value: String,
                                    dataKey: 'value'
                                },
                                unit: {
                                    dataKey: 'unit'
                                }
                            }
                        }
                    },
                    dataKey: 'dosage.rateRatio.numerator'
                }, {
                    content: {
                        name: 'administrationUnitCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'dosage.method.coding[0]'
                }, {
                    content: {
                        name: 'consumable',
                        children: {
                            arrayContent: [
                                medicationInformation
                            ]
                        }
                    },
                    dataKey: jp('medicationReference.reference.getById()')
                }, {
                    value: fieldLevel.performer,
                    dataKey: jp('practitioner.reference.getById()')
                }, {
                    content: {
                        name: 'participant',
                        attributes: {
                            constant: {
                                typeCode: "CSM"
                            }
                        },
                        children: {
                            arrayContent: [
                                sharedEntryLevel.drugVehicle
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'RSON'
                            }
                        },
                        children: {
                            arrayContent: [
                                sharedEntryLevel.indication
                            ]
                        }
                    },
                    dataKey: jp('prescription.reference.getById().reasonReference.reference.getById()')
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'REFR'
                            }
                        },
                        children: {
                            arrayContent: [
                                medicationSupplyOrder
                            ]
                        }
                    },
                    dataKey: jp('prescription.reference.getById()')
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'REFR'
                            }
                        },
                        children: {
                            arrayContent: [
                                medicationDispense
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'precondition',
                        attr: {
                            constant: {
                                typeCode: 'PRCN'
                            }
                        },
                        children: {
                            arrayContent: [
                                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.25'),
                                sharedEntryLevel.preconditionForSubstanceAdministration
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    }
};
