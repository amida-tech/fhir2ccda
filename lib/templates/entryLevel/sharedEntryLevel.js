"use strict";

var _ = require('lodash');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

var h = require('../templateHelper');

exports.indication = {
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
                fieldLevel.templateId("2.16.840.1.113883.10.20.22.4.19"), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'code'
                },
                h.constAttrChild('statusCode', {
                    code: 'completed'
                }), {
                    content: {
                        name: 'effectiveTime'
                    }
                }, {
                    content: {
                        name: 'value',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    }
};

exports.preconditionForSubstanceAdministration = {
    content: {
        name: 'criterion',
        children: {
            arrayContent: [{
                name: 'code',
                attr: {
                    content: {
                        code: _.identity,
                        codeSystem: '2.16.840.1.113883.5.4'
                    },
                    dataKey: 'code'
                }
            }, {
                content: {
                    name: 'value',
                    attr: leafLevel.code
                },
                dataKey: 'value'
            }]
        }
    }
};

exports.drugVehicle = {
    content: {
        name: 'participantRole',
        attr: {
            constant: {
                classCode: 'MANU'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.20'),
                h.constAttrChild('code', {
                    code: '412307009',
                    displayName: 'drug vehicle',
                    codeSystem: '2.16.840.1.113883.6.96',
                    codeSystemName: 'SNOMED CT'
                }), {
                    content: {
                        name: 'playingEntity',
                        attr: {
                            constant: {
                                classCode: 'MMAT'
                            }
                        },
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'code',
                                    attr: leafLevel.code
                                }
                            }, {
                                content: {
                                    name: 'name',
                                    text: {
                                        dataKey: 'name'
                                    }
                                }
                            }]
                        }
                    }
                }
            ]
        }
    }
};

exports.instructions = {
    content: {
        name: 'act',
        attr: {
            constant: {
                classCode: 'ACT',
                moodCode: 'INT'
            }
        },
        children: [
            fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.20'), {
                content: {
                    name: 'code',
                    attr: leafLevel.code
                },
                dataKey: 'TBD'
            },
            h.constAttrChild('statusCode', {
                code: 'completed'
            })
        ]
    }
};
