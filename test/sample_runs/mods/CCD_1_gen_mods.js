"use strict";

var modsUtil = require('./modsUtil');

var _p = modsUtil.toJSONPath;
var _t = modsUtil.toTemplateIdSelect;
var _a = modsUtil.toAttributeSelect;

module.exports = exports = [{
    path: _p('component.*.*.*') + _t('2.16.840.1.113883.10.20.22.2.6.1') + '.^.^',
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('code', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('entry.act.entryRelationship.observation') + '.' + _a('entryRelationship', 'typeCode', 'MFST') + '.' + _p('observation.value', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('entry.act.entryRelationship.observation') + '.' + _a('entryRelationship', 'typeCode', 'MFST') + '.' + _p('observation') + '..' + _p('entryRelationship.observation.value', 'attr.code'),
        actionKey: 'delete'
    }, {
        path: _p('entry.act.entryRelationship.observation') + '.' + _a('entryRelationship', 'typeCode', 'MFST') + '.' + _p('observation') + '..' + _p('entryRelationship.observation.value', 'attr.displayName'),
        actionKey: 'delete'
    }]
}, {
    path: _p('component.*.*.*') + _t('2.16.840.1.113883.10.20.22.2.5.1') + '.^.^',
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('entry.act.entryRelationship.observation') + '.' + _a('code', 'displayName', 'Finding') + '.^.^.^.^.^.^.^.^',
        actionKey: 'delete',
    }, {
        path: _p('entry.act.entryRelationship.observation.value', 'attr.codeSystemName'),
        actionKey: 'delete',
    }, {
        path: _p('entry.act.entryRelationship.observation.code', 'attr.codeSystemName'),
        actionKey: 'delete',
    }, {
        path: _p('entry.act.entryRelationship.observation.entryRelationship.observation.code', 'attr.codeSystemName'),
        actionKey: 'delete',
    }]
}];
