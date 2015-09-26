"use strict";

var leafLevel = require('./leafLevel');

exports.allergyProblemAct = {
    content: {
        act: {
            content: {
                '$': {
                    constant: {
                        classCode: 'ACT',
                        moodCode: 'EVN'
                    }
                },
                templateId: leafLevel.templateId('2.16.840.1.113883.10.20.22.4.30'),
                code: {
                    constant: {
                        '$': {
                            'code': '48765-2',
                            'codeSystem': '2.16.840.1.113883.6.1',
                            'codeSystemName': 'LOINC',
                            'displayName': 'Allergies, adverse reactions, alerts'
                        }
                    }
                },
                'statusCode.$.code': {
                    value: leafLevel.codeToValueSet('problemActStatusCode'),
                    dataKey: 'status'
                }
            }
        }
    }
    /*
    key: "act",
    attributes: {
        classCode: "ACT",
        moodCode: "EVN"
    },
    content: [
        fieldLevel.templateId("2.16.840.1.113883.10.20.22.4.30"),
        fieldLevel.uniqueId,
        fieldLevel.id,
        fieldLevel.templateCode("AllergyProblemAct"),
        fieldLevel.statusCodeActive, [fieldLevel.effectiveTime, required], {
            key: "entryRelationship",
            attributes: {
                typeCode: "SUBJ",
                inversionInd: "true"
            },
            content: [allergyIntoleranceObservation, required],
            existsWhen: condition.keyExists('observation'),
            required: true,
            warning: "inversionInd is not in spec"
        }
    ],
    warning: "statusCode is not constant in spec"
    */
};
