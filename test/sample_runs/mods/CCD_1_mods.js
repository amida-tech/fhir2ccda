"use strict";

var modsUtil = require('./modsUtil');

var _p = modsUtil.toJSONPath;
var _t = modsUtil.toTemplateIdSelect;
var _s = modsUtil.toSelect;
var _a = modsUtil.toAttributeSelect;
var _tex = modsUtil.toTemplateIdExlusion;

var supportedSections = [
    '2.16.840.1.113883.10.20.22.2.6', // allergies
    '2.16.840.1.113883.10.20.22.2.6.1',
    '2.16.840.1.113883.10.20.22.2.5', // problems
    '2.16.840.1.113883.10.20.22.2.5.1',
    '2.16.840.1.113883.10.20.22.2.3', // results
    '2.16.840.1.113883.10.20.22.2.3.1',
];

module.exports = exports = [{
    path: _p('id'),
    actionKey: 'delete'
}, {
    path: _p('effectiveTime'),
    actionKey: 'delete'
}, {
    path: _p('confidentialityCode'),
    actionKey: 'delete'
}, {
    path: _p('setId'),
    actionKey: 'delete'
}, {
    path: _p('author'),
    actionKey: 'delete'
}, {
    path: _p('dataEnterer'),
    actionKey: 'delete'
}, {
    path: _p('informant'),
    actionKey: 'delete'
}, {
    path: _p('custodian'),
    actionKey: 'delete'
}, {
    path: _p('informationRecipient'),
    actionKey: 'delete'
}, {
    path: _p('legalAuthenticator'),
    actionKey: 'delete'
}, {
    path: _p('authenticator'),
    actionKey: 'delete'
}, {
    path: _p('documentationOf'),
    actionKey: 'delete'
}, {
    path: _p('recordTarget.patientRole'),
    actionKey: 'root',
    children: [{
        path: _p('patient.name', 'attr'),
        actionKey: 'delete'
    }, {
        path: _p('patient.maritalStatusCode', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('patient.religiousAffiliationCode', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('patient.raceCode', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('patient.ethnicGroupCode', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('patient.guardian'),
        actionKey: 'delete'
    }, {
        path: _p('patient.languageCommunication.modeCode'),
        actionKey: 'delete'
    }, {
        path: _p('patient.languageCommunication.proficiencyLevelCode'),
        actionKey: 'delete'
    }, {
        path: _p('providerOrganization'),
        actionKey: 'delete'
    }]
}, {
    path: [_p('component'), '', _p('originalText')].join('.'),
    actionKey: 'delete'
}, {
    path: [_p('component.*.*.*'), _tex(supportedSections), '^.^.^.^'].join('.'),
    actionKey: 'delete'
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.6.1'), '^.^'].join('.'),
    actionKey: 'root',
    children: [{
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('text'),
        actionKey: 'delete'
    }, {
        path: _p('entry.act'),
        actionKey: 'root',
        children: [{
            path: _p('id'),
            actionKey: 'delete'
        }, {
            path: _p('effectiveTime'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.id'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.effectiveTime'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.value'),
            actionKey: 'delete'
        }, {
            path: [_p('entryRelationship.observation.entryRelationship.observation'), _t('2.16.840.1.113883.10.20.22.4.8'), '^.^.^.^'].join('.'),
            actionKey: 'delete'
        }, {
            path: [_p('entryRelationship.observation.entryRelationship.observation'), _t('2.16.840.1.113883.10.20.22.4.9'), '^.^'].join('.'),
            actionKey: 'root',
            children: [{
                path: _p('id'),
                actionKey: 'delete'
            }, {
                path: _p('text'),
                actionKey: 'delete'
            }, {
                path: _p('effectiveTime'),
                actionKey: 'delete'
            }]
        }, {
            path: [_p('entryRelationship.observation.entryRelationship.observation'), _t('2.16.840.1.113883.10.20.22.4.9'), '^.^'].join('.'),
            actionKey: 'root',
            children: [{
                path: _p('id'),
                actionKey: 'delete'
            }, {
                path: _p('text'),
                actionKey: 'delete'
            }, {
                path: _p('effectiveTime'),
                actionKey: 'delete'
            }, {
                path: _p('entryRelationship.observation.text'),
                actionKey: 'delete'
            }, {
                path: _p('entryRelationship.observation.interpretationCode'),
                actionKey: 'delete'
            }]
        }]
    }, {
        path: [_p('entry.act.entryRelationship.observation'), _a('entryRelationship', 'typeCode', 'MFST'), _p('observation'), '', _p('entryRelationship.observation.value', '.attr.code')].join('.'),
        actionKey: 'delete'
    }, {
        path: [_p('entry.act.entryRelationship.observation'), _a('entryRelationship', 'typeCode', 'MFST'), _p('observation'), '', _p('entryRelationship.observation.value', '.attr.displayName')].join('.'),
        actionKey: 'delete'
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.5.1'), '^.^'].join('.'),
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('text'),
        actionKey: 'delete'
    }, {
        path: _p('entry.act'),
        actionKey: 'root',
        children: [{
            path: _p('id'),
            actionKey: 'delete'
        }, {
            path: _p('effectiveTime'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.text'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.effectiveTime'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.id'),
            actionKey: 'delete'
        }, {
            path: [_p('entryRelationship.observation.entryRelationship.observation'), _s('code', '@.attr.displayName!=="Status"'), '^.^.^.^'].join('.'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.entryRelationship.observation.text'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.entryRelationship.observation.id'),
            actionKey: 'delete'
        }, {
            path: _p('entryRelationship.observation.entryRelationship.observation.effectiveTime'),
            actionKey: 'delete'
        }]
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.3.1'), '^.^'].join('.'),
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('text'),
        actionKey: 'delete'
    }, {
        path: _p('entry.organizer'),
        actionKey: 'root',
        children: [{
            path: _p('id'),
            actionKey: 'delete'
        }, {
            path: _p('component.observation'),
            actionKey: 'root',
            children: [{
                path: _p('id'),
                actionKey: 'delete'
            }, {
                path: _p('text'),
                actionKey: 'delete'
            }]
        }]
    }]
}];
