"use strict";

var _ = require('lodash');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

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
                                name: 'code',
                                attr: leafLevel.code
                            }]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'manufacturerOrganization',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'name',
                                    text: _.identity
                                },
                                dataKey: 'TBD'
                            }]
                        }
                    }
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
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'repeatNumber',
                        'attr.value': _.identify
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'quantity',
                        'attr.value': _.identify
                    },
                    dataKey: 'TBD'
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
                },
                fieldLevel.author, {
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
                moodCode: function (input) {
                    var status = input.status;
                    if (status) {
                        if (status === 'Prescribed') {
                            return 'INT';
                        }
                        if (status === 'Completed') {
                            return 'EVN';
                        }
                    }
                    return null;
                }
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
                        name: 'effectiveTime'
                    }
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
                                                dataKey: 'value'
                                            },
                                            unit: {
                                                dataKey: 'unit'
                                            }
                                        }
                                    }
                                },
                                dataKey: 'TBD'
                            }]
                        }
                    }
                }, {
                    content: {
                        name: 'routeCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'doseQuantity',
                        attr: {
                            content: {
                                value: {
                                    dataKey: 'value'
                                },
                                unit: {
                                    dataKey: 'unit'
                                }
                            },
                            dataKey: 'TBD'
                        }
                    }
                }, {
                    content: {
                        name: 'rateQuantity',
                        attr: {
                            content: {
                                value: {
                                    dataKey: 'value'
                                },
                                unit: {
                                    dataKey: 'unit'
                                }
                            },
                            dataKey: 'TBD'
                        }
                    }
                }, {
                    content: {
                        name: 'administrationUnitCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'consumable',
                        children: {
                            arrayContent: [
                                medicationInformation
                            ]
                        }
                    },
                    dataKey: 'TBD'
                },
                fieldLevel.performer, {
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
                    dataKey: 'TBD'
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
                    dataKey: 'TBD'
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
