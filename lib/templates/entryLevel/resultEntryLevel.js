"use strict";

var _ = require('lodash');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');
var commonTemplates = require('../commonTemplates');

var h = require('../templateHelper');

exports.resultObservation = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                classCode: "OBS",
                moodCode: "EVN"
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.2'), {
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
                        'attr.value': leafLevel.time,
                    },
                    dataKey: 'effectiveDateTime'
                }, {
                    content: {
                        name: 'value',
                        attr: {
                            content: {
                                'xsi:type': 'PQ',
                                value: {
                                    dataKey: 'value'
                                },
                                unit: {
                                    dataKey: 'unit'
                                }
                            },
                            dataKey: 'valueQuantity'
                        }
                    }
                }, {
                    content: {
                        name: 'interpretationCode',
                        attr: leafLevel.code
                    },
                    dataKey: 'interpretation.coding'
                }, {
                    content: {
                        name: 'referenceRange',
                        children: {
                            content: {
                                name: 'observationRange',
                                children: {
                                    arrayContent: [{
                                        content: {
                                            name: 'value',
                                            attr: {
                                                constant: {
                                                    "xsi:type": "IVL_PQ"
                                                }
                                            },
                                            children: {
                                                arrayContent: [{
                                                    content: {
                                                        name: 'low',
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
                                                    dataKey: 'low'
                                                }, {
                                                    content: {
                                                        name: 'high',
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
                                                    dataKey: 'high'
                                                }]
                                            }
                                        },
                                        existsUnless: [_.negate(_.partialRight(_.has, 'low')), _.negate(_.partialRight(_.has, 'high'))]
                                    }, {
                                        content: {
                                            name: 'text',
                                            text: {
                                                value: _.identity,
                                                dataKey: 'text'
                                            }
                                        },
                                        existsWhen: [_.negate(_.partialRight(_.has, 'low')), _.negate(_.partialRight(_.has, 'high'))]
                                    }]
                                }
                            },
                            multiple: true
                        }
                    },
                    dataKey: 'referenceRange'
                }
            ]
        }
    }
};

exports.resultOrganizer = {
    content: {
        name: 'organizer',
        attr: {
            constant: {
                classCode: 'BATTERY',
                moodCode: 'EVN'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.1'), {
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
                        name: 'component',
                        children: {
                            arrayContent: [
                                exports.resultObservation
                            ]
                        }
                    }
                },
                commonTemplates.commentActivityEntryRelationship
            ]
        }
    }
};
