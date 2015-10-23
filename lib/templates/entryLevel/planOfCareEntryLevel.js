"use strict";

var _ = require('lodash');

var fieldLevel = require('../fieldLevel');
var leafLevel = require('../leafLevel');

var h = require('../templateHelper');

exports.planOfCareActivityAct = {
    content: {
        name: 'act',
        attr: {
            constant: {
                classCode: 'ACT',
                moodCode: 'RQO'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.39'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                h.constAttrChild('statusCode', {
                    code: 'new'
                }), {
                    content: {
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    },
    existsWhen: function (input) {
        return false;
    }
};

exports.planOfCareActivityObservation = {
    content: {
        name: 'observation',
        attr: {
            constant: {
                classCode: 'OBS',
                moodCode: 'RQO'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.44'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                h.constAttrChild('statusCode', {
                    code: 'new'
                }), {
                    content: {
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    },
    existsWhen: function (input) {
        return false;
    }
};

exports.planOfCareActivityProcedure = {
    content: {
        name: 'procedure',
        attr: {
            constant: {
                classCode: 'PROC',
                moodCode: 'RQO'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.41'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'code.coding[0]'
                },
                h.constAttrChild('statusCode', {
                    code: 'new'
                }), {
                    content: {
                        name: 'effectiveTime',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'center',
                                    'attr.value': leafLevel.date
                                }
                            }]
                        }
                    },
                    dataKey: 'scheduledDateTime'
                }
            ]
        }
    },
    existsWhen: _.matchesProperty('resourceType', 'ProcedureRequest')
};

exports.planOfCareActivityEncounter = {
    content: {
        name: 'encounter',
        attr: {
            constant: {
                classCode: 'ENC',
                moodCode: 'INT'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.40'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                h.constAttrChild('statusCode', {
                    code: 'new'
                }), {
                    content: {
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    },
    existsWhen: function (input) {
        return false;
    }
};

exports.planOfCareActivitySubstanceAdministration = {
    content: {
        name: 'substanceAdministration',
        attr: {
            constant: {
                classCode: 'SBADM',
                moodCode: 'RQO'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.42'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                h.constAttrChild('statusCode', {
                    code: 'new'
                }), {
                    content: {
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    },
    existsWhen: function (input) {
        return false;
    }
};

exports.planOfCareActivitySubstanceAdministration = {
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
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.43'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                h.constAttrChild('statusCode', {
                    code: 'new'
                }), {
                    content: {
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                }
            ]
        }
    },
    existsWhen: function (input) {
        return false;
    }
};

var goal = {
    content: {
        name: 'code',
        attr: {
            code: 'code',
            displayName: 'Goal'
        }
    },
    dataKey: 'TBD'
};

var intervention = {
    content: {
        name: 'code',
        attr: {
            code: 'code',
            displayName: 'intervention'
        }
    },
    dataKey: 'TBD'
};

exports.planOfCareActivityInstructions = {
    content: {
        name: 'instructions',
        attr: {
            constant: {
                classCode: 'ACT',
                moodCode: 'INT'
            }
        },
        children: {
            arrayContent: [
                fieldLevel.templateId('2.16.840.1.113883.10.20.22.4.20'), {
                    content: {
                        name: 'code',
                        attr: leafLevel.code
                    },
                    dataKey: 'TBD'
                },
                h.constAttrChild('statusCode', {
                    code: 'new'
                }), {
                    content: {
                        name: 'priorityCode',
                        attr: {
                            content: {
                                code: 'code',
                                displayName: 'intervention'
                            }
                        }
                    },
                    dataKey: 'TBD'
                }, {
                    content: {
                        name: 'effectiveTime'
                    },
                    dataKey: 'TBD'
                },
                goal, {
                    content: {
                        name: 'entryRelationship',
                        'attr.typeCode': 'COMP',
                        children: {
                            arrayContent: [{
                                content: {
                                    name: 'observation',
                                    attr: {
                                        constant: {
                                            classCode: 'OBS',
                                            moodCode: 'GOL'
                                        }
                                    },
                                    children: {
                                        arrayContent: [{
                                                content: {
                                                    name: 'effectiveTime'
                                                },
                                                dataKey: 'TBD'
                                            },
                                            goal, {
                                                name: 'act',
                                                attr: {
                                                    constant: {
                                                        attr: 'ACT',
                                                        moodCode: 'INT'
                                                    }
                                                },
                                                children: {
                                                    arrayContent: [{
                                                        name: 'entryRelationship',
                                                        'attr.typeCode': 'REFR',
                                                        children: {
                                                            arrayContent: [intervention]
                                                        }
                                                    }]
                                                }
                                            }
                                        ]
                                    }
                                }
                            }]
                        }
                    }
                }
            ]
        },
        dataKey: 'TBD'
    }
};
