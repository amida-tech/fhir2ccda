"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

var jp = jsonave.instance;

var immunizationMedicationInformation = {
    content: {
        name: 'manufacturedProduct',
        attr: {
            constant: {
                classCode: 'MANU'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.54'), {
                    content: {
                        name: 'manufacturedMaterial',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'code',
                                    attr: leafLevel.code
                                },
                                dataKey: 'vaccineCode.coding[0]'
                            }, {
                                content: {
                                    name: 'lotNumberText',
                                    text: _.identity
                                },
                                dataKey: 'lotNumber'
                            }]
                        }
                    }
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

var immunizationRefusalReason = {
    content: {
        name: 'observation',
        attr: {
            classCode: 'OBS',
            moodCode: 'EVN'
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.53'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    }
                }
            ]
        }
    }
};

exports.immunizationActivity = {
    content: {
        name: 'substanceAdministration',
        attr: {
            content: {
                classCode: 'SBADM',
                moodCode: 'EVN',
                negationInd: {
                    value: String,
                    dataTransform: function (input) {
                        return !!input.wasNotGiven;
                    }
                }
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.52'),
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.date
                    },
                    dataKey: 'date'
                }, {
                    content: {
                        name: 'repeatNumber',
                        'attr.value': 'xx'
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'routeCode',
                        attr: leafLevel.code,
                    },
                    dataKey: 'route.coding[0]'
                }, {
                    content: {
                        name: 'approachSiteCode',
                        attr: leafLevel.code,
                    },
                    dataKey: 'TBD'
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
                    dataKey: 'doseQuantity'
                }, {
                    content: {
                        name: 'consumable',
                        children: {
                            arrayContent: [
                                immunizationMedicationInformation
                            ]
                        }
                    },
                    existsWhen: _.partialRight(_.has, 'vaccineCode')
                }, {
                    value: fieldLevel.performer,
                    dataKey: jp('performer.reference.getById()')
                }, {
                    content: {
                        name: 'entryRelationship',
                        attr: {
                            constant: {
                                typeCode: 'SUBJ',
                                inversionInd: "false"
                            }
                        },
                        children: {
                            arrayContent: [
                                sharedEntryLevel.instructions
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
                                immunizationRefusalReason
                            ]
                        }
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    }
};
