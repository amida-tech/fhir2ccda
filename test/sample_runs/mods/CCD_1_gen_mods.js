"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var modsUtil = require('./modsUtil');

var jp = jsonave.instance;

var _p = modsUtil.toJSONPath;
var _t = modsUtil.toTemplateIdSelect;
var _a = modsUtil.toAttributeSelect;

module.exports = exports = [{
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.6.1'), '^.^'].join('.'),
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
        path: [_p('entry.act.entryRelationship.observation'), _a('entryRelationship', 'typeCode', 'MFST'), _p('observation.value', 'attr.codeSystemName')].join('.'),
        actionKey: 'delete'
    }, {
        path: [_p('entry.act.entryRelationship.observation'), _a('entryRelationship', 'typeCode', 'MFST'), _p('observation'), '', _p('entryRelationship.observation.value', 'attr.code')].join('.'),
        actionKey: 'delete'
    }, {
        path: [_p('entry.act.entryRelationship.observation'), _a('entryRelationship', 'typeCode', 'MFST'), _p('observation'), '', _p('entryRelationship.observation.value', 'attr.displayName')].join('.'),
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
        path: [_p('entry.act.entryRelationship.observation'), _a('code', 'displayName', 'Finding'), '^.^.^.^.^.^.^.^'].join('.'),
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
        path: _p('entry.organizer'),
        actionKey: 'root',
        children: [{
            path: _p('code', 'attr'),
            actionKey: 'modify',
            value: {
                'code': '43789009',
                'displayName': 'CBC WO DIFFERENTIAL',
                'codeSystem': '2.16.840.1.113883.6.96',
                'codeSystemName': 'SNOMED CT'
            }
        }, {
            path: _p('component.observation'),
            actionKey: 'root',
            children: [{
                path: _p('effectiveTime', 'attr.value'),
                actionKey: 'deletesecond'
            }, {
                path: _p('text'),
                actionKey: 'delete'
            }]
        }]
    }, {
        actionKey: 'custom',
        fn: function (obj) {
            var f = jp(_p('entry'), {
                wrap: true,
            });
            var entries = f(obj);
            var target = _.get(entries[0], 'children[0].children');
            for (var i = 1; i < 3; ++i) {
                var g = jp(_p('organizer.component'), {
                    wrap: false
                });
                var source = g(entries[i]);
                target.push(source);
            }
            var n = obj.children.length;
            obj.children.splice(n - 2, 2);
        }
    }]
}];
