"use strict";

var _ = require('lodash');
var jsonave = require('jsonave');

var modsUtil = require('./modsUtil');

var jp = jsonave.instance;

var _p = modsUtil.toJSONPath;
var _t = modsUtil.toTemplateIdSelect;
var _a = modsUtil.toAttributeSelect;

module.exports = exports = [{
    path: _p('documentationOf'),
    actionKey: 'delete'
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.6.1'), '^.^'],
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
        path: [_p('entry.act.entryRelationship.observation'), _a('entryRelationship', 'typeCode', 'MFST'), _p('observation.value', 'attr.codeSystemName')],
        actionKey: 'delete'
    }, {
        path: [_p('entry.act.entryRelationship.observation'), _a('entryRelationship', 'typeCode', 'MFST'), _p('observation'), '', _p('entryRelationship.observation.value', 'attr.code')],
        actionKey: 'delete'
    }, {
        path: [_p('entry.act.entryRelationship.observation'), _a('entryRelationship', 'typeCode', 'MFST'), _p('observation'), '', _p('entryRelationship.observation.value', 'attr.displayName')],
        actionKey: 'delete'
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.5.1'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: [_p('entry.act.entryRelationship.observation'), _a('code', 'displayName', 'Finding'), '^.^.^.^.^.^.^.^'],
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
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.3.1'), '^.^'],
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
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.1.1'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('entry.substanceAdministration'),
        actionKey: 'root',
        children: [{
            path: _p('consumable.manufacturedProduct.manufacturedMaterial.code', 'attr.codeSystemName'),
            actionKey: 'delete'
        }, {
            path: [_p('entryRelationship.observation'), _t('2.16.840.1.113883.10.20.22.4.19'), '^.^', _p('value', 'attr.codeSystemName')],
            actionKey: 'delete'
        }, {
            path: [_p('entryRelationship.supply'), _t('2.16.840.1.113883.10.20.22.4.17'), '^.^'],
            actionKey: 'root',
            children: [{
                path: _p('product.manufacturedProduct.manufacturedMaterial.code', 'attr.codeSystemName'),
                actionKey: 'delete'
            }]
        }]
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.22.1'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('entry.encounter'),
        actionKey: 'root',
        children: [{
            path: _p('entryRelationship.observation.value', 'attr.codeSystemName'),
            actionKey: 'delete'
        }]
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.4.1'), '^.^'],
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
            path: _p('code', 'attr.codeSystemName'),
            actionKey: 'delete'
        }]
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.7.1'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: [_p('entry.observation'), '^.^', 'attr'],
        actionKey: 'delete'
    }, {
        path: _p('entry.procedure'),
        actionKey: 'root',
        children: [{
            path: _p('participant.participantRole.playingDevice.code', 'attr.codeSystemName'),
            actionKey: 'delete'
        }]
    }, {
        path: _p('entry.observation'),
        actionKey: 'root',
        children: [{
            path: _p('code', 'attr.codeSystemName'),
            actionKey: 'delete'
        }]
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.18'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('entry.act'),
        actionKey: 'root',
        children: []
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.17'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: [_p('entry.observation'), _t('2.16.840.1.113883.10.20.22.4.78'), '^.^'],
        actionKey: 'root',
        children: [{
            path: _p('code', 'attr.displayName'),
            actionKey: 'delete'
        }, {
            path: _p('code', 'attr.codeSystemName'),
            actionKey: 'delete'
        }, {
            path: _p('value', 'attr.codeSystemName'),
            actionKey: 'delete'
        }]
    }, {
        path: [_p('entry.observation'), _t('2.16.840.1.113883.10.20.22.4.38'), '^.^'],
        actionKey: 'root',
        children: [{
            path: _p('code', 'attr.codeSystemName'),
            actionKey: 'delete'
        }]
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.10'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('entry', 'attr'),
        actionKey: 'delete'
    }, {
        path: _p('entry.observation'),
        actionKey: 'root',
        children: []
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.2.1'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('entry.substanceAdministration'),
        actionKey: 'root',
        children: []
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.15'), '^.^'],
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
        path: _p('entry.organizer'),
        actionKey: 'root',
        children: [{
            path: _p('component.observation.value', 'attr.codeSystemName'),
            actionKey: 'delete'
        }, {
            path: _p('component.observation.entryRelationship.observation.code', 'attr.codeSystemName'),
            actionKey: 'delete'
        }, {
            path: [_p('component.observation.entryRelationship.observation'), _t('2.16.840.1.113883.10.20.22.4.47'), '^.^'],
            actionKey: 'root',
            children: [{
                path: _p('code', 'attr.displayName'),
                actionKey: 'delete'
            }, {
                path: _p('value', 'attr.codeSystemName'),
                actionKey: 'delete'
            }]
        }]
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.14'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('code', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('entry.organizer'),
        actionKey: 'root',
        children: [{
            path: _p('id'),
            actionKey: 'delete'
        }, {
            path: _p('component.observation.id'),
            actionKey: 'delete'
        }, {
            path: _p('component.observation.effectiveTime', 'attr.value'),
            actionKey: 'deletesecond'
        }]
    }]
}, {
    path: [_p('component.*.*.*'), _t('2.16.840.1.113883.10.20.22.2.23'), '^.^'],
    actionKey: 'root',
    children: [{
        path: _p('title'),
        actionKey: 'delete'
    }, {
        path: _p('code', 'attr.displayName'),
        actionKey: 'delete'
    }, {
        path: _p('code', 'attr.codeSystemName'),
        actionKey: 'delete'
    }, {
        path: _p('entry.supply'),
        actionKey: 'root',
        children: [{
            path: _p('id'),
            actionKey: 'delete'
        }, {
            path: _p('participant.participantRole.playingDevice.code', 'attr.codeSystemName'),
            actionKey: 'delete'
        }]
    }]
}];
