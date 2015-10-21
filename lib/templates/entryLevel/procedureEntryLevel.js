"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var sharedEntryLevel = require('./sharedEntryLevel');

var h = require('../templateHelper');

var jp = jsonave.instance;

exports.procedureActivityAct = {
    content: {
        name: 'act',
        attr: {
            constant: {
                classCode: 'ACT',
                moodCode: 'INT'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.12'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'code.coding[0]'
                },
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time
                    },
                    dataKey: 'performedDateTime'
                }, {
                    content: {
                        name: 'priorityCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'targetSiteCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'bodySite[0].coding[0]'
                }, {
                    value: fieldLevel.performer,
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'participant',
                        attr: {
                            constant: {
                                typeCode: 'LOC'
                            }
                        },
                        children: {
                            arrayContent: [
                                sharedEntryLevel.serviceDeliveryLocation
                            ]
                        }
                    }
                }
            ]
        }
    },
    existsWhen: [_.negate(_.matchesProperty('category.coding[0].code', '46947000')), _.negate(_.matchesProperty('category.coding[0].code', '103693007'))]
};

exports.procedureActivityProcedure = {
    content: {
        name: 'procedure',
        attr: {
            constant: {
                classCode: 'PROC',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.14'),
                fieldLevel.id2, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'code.coding[0]'
                },
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time
                    },
                    dataKey: 'performedDateTime'
                }, {
                    content: {
                        name: 'priorityCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'targetSiteCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'bodySite[0].coding[0]'
                }, {
                    content: {
                        name: 'specimen',
                        attr: {
                            constant: {
                                typeCode: 'SPC'
                            }
                        },
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'specimenRole',
                                    attr: {
                                        constant: {
                                            classCode: 'SPEC'
                                        }
                                    },
                                    children: {
                                        arrayContent: [{
                                            content: {
                                                name: 'specimenPlayingEntity',
                                                attr: leafLevel.code
                                            }
                                        }]
                                    }
                                }
                            }]
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    value: fieldLevel.performer,
                    dataKey: jp('performer[0].actor.reference.getById()')
                }, {
                    content: {
                        name: 'participant',
                        attr: {
                            constant: {
                                typeCode: 'DEV'
                            }
                        },
                        children: {
                            arrayContent: [
                                sharedEntryLevel.productInstance
                            ]
                        }
                    },
                    dataKey: jp('used[0].reference.getById()')
                }
            ]
        }
    },
    existsWhen: _.matchesProperty('category.coding[0].code', '103693007')
};

exports.procedureActivityObservation = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                classCode: 'OBS',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.13'),
                fieldLevel.id2, {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'code.coding[0]'
                }, {
                    content: {
                        name: 'statusCode',
                        'attr.code': leafLevel.codeToValueSet('procedureStatus')
                    },
                    dataKey: 'status'
                }, {
                    content: {
                        name: 'effectiveTime',
                        'attr.value': leafLevel.time
                    },
                    dataKey: 'performedDateTime'
                }, {
                    content: {
                        name: 'priorityCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'value',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'targetSiteCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'bodySite[0].coding[0]'
                }, {
                    value: fieldLevel.performer,
                    dataKey: jp('performer[0].actor.reference.getById()')
                }, {
                    content: {
                        name: 'participant',
                        attr: {
                            constant: {
                                typeCode: 'LOC'
                            }
                        },
                        children: {
                            arrayContent: [{
                                value: sharedEntryLevel.serviceDeliveryLocation,
                                dataKey: jp('location.reference.getById()')
                            }]
                        }
                    }
                }
            ]
        }
    },
    existsWhen: _.matchesProperty('category.coding[0].code', '46947000')
};
