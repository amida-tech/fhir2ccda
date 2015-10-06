"use strict";

module.exports = exports = [{
    path: 'children[?(@.name==="component")].children[*].children[*].children[*].children[?((@.name==="templateId")&&(@.attr.root==="2.16.840.1.113883.10.20.22.2.6.1"))].^.^',
    actionKey: 'root',
    children: [{
        path: 'children[?(@.name==="code")].attr.displayName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="code")].attr.codeSystemName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="title")]',
        actionKey: 'delete'
    }]
}, {
    path: 'children[?(@.name==="component")].children[*].children[*].children[*].children[?((@.name==="templateId")&&(@.attr.root==="2.16.840.1.113883.10.20.22.2.5.1"))].^.^',
    actionKey: 'root',
    children: [{
        path: 'children[?(@.name==="code")].attr.displayName',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="title")]',
        actionKey: 'delete'
    }, {
        path: 'children[?(@.name==="entry")].children[?(@.name==="act")].children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?((@.name==="value")&&(@.attr.code==="CONC"))].^.^.^.^.^.^.^.^',
        actionKey: 'delete',
    }, {
        path: 'children[?(@.name==="entry")].children[?(@.name==="act")].children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="value")].attr.codeSystemName',
        actionKey: 'delete',
    }, {
        path: 'children[?(@.name==="entry")].children[?(@.name==="act")].children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="code")].attr.codeSystemName',
        actionKey: 'delete',
    }, {
        path: 'children[?(@.name==="entry")].children[?(@.name==="act")].children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="code")].attr.code',
        actionKey: 'modify',
        value: '409586006'
    }, {
        path: 'children[?(@.name==="entry")].children[?(@.name==="act")].children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="code")].attr.displayName',
        actionKey: 'modify',
        value: 'Complaint'
    }, {
        path: 'children[?(@.name==="entry")].children[?(@.name==="act")].children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="entryRelationship")].children[?(@.name==="observation")].children[?(@.name==="code")].attr.codeSystemName',
        actionKey: 'delete',
    }]
}];
