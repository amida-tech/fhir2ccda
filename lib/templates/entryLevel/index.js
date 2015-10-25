'use strict';

var allergyEntryLevel = require('./allergyEntryLevel');
var medicationEntryLevel = require('./medicationEntryLevel');
var immunizationEntryLevel = require('./immunizationEntryLevel');
var problemEntryLevel = require('./problemEntryLevel');
var resultEntryLevel = require('./resultEntryLevel');
var encounterEntryLevel = require('./encounterEntryLevel');
var procedureEntryLevel = require('./procedureEntryLevel');
var vitalSignEntryLevel = require('./vitalSignEntryLevel');
var payerEntryLevel = require('./payerEntryLevel');
var socialHistoryEntryLevel = require('./socialHistoryEntryLevel');
var planOfCareEntryLevel = require('./planOfCareEntryLevel');
var familyHistoryEntryLevel = require('./familyHistoryEntryLevel');
var functionalStatusEntryLevel = require('./functionalStatusEntryLevel');

exports.allergyProblemAct = allergyEntryLevel.allergyProblemAct;

exports.medicationActivity = medicationEntryLevel.medicationActivity;

exports.immunizationActivity = immunizationEntryLevel.immunizationActivity;

exports.problemConcernAct = problemEntryLevel.problemConcernAct;

exports.resultOrganizer = resultEntryLevel.resultOrganizer;

exports.encounterActivities = encounterEntryLevel.encounterActivities;

exports.procedureActivityAct = procedureEntryLevel.procedureActivityAct;
exports.procedureActivityProcedure = procedureEntryLevel.procedureActivityProcedure;
exports.procedureActivityObservation = procedureEntryLevel.procedureActivityObservation;

exports.vitalSignsOrganizer = vitalSignEntryLevel.vitalSignsOrganizer;

exports.coverageActivity = payerEntryLevel.coverageActivity;

exports.socialHistoryObservation = socialHistoryEntryLevel.socialHistoryObservation;
exports.smokingStatusObservation = socialHistoryEntryLevel.smokingStatusObservation;

exports.planOfCareActivityAct = planOfCareEntryLevel.planOfCareActivityAct;
exports.planOfCareActivityObservation = planOfCareEntryLevel.planOfCareActivityObservation;
exports.planOfCareActivityProcedure = planOfCareEntryLevel.planOfCareActivityProcedure;
exports.planOfCareActivityEncounter = planOfCareEntryLevel.planOfCareActivityEncounter;
exports.planOfCareActivitySubstanceAdministration = planOfCareEntryLevel.planOfCareActivitySubstanceAdministration;
exports.planOfCareActivitySupply = planOfCareEntryLevel.planOfCareActivitySupply;
exports.planOfCareActivityInstructions = planOfCareEntryLevel.planOfCareActivityInstructions;

exports.familyHistoryOrganizer = familyHistoryEntryLevel.familyHistoryOrganizer;

exports.cognitiveStatusResultObservation = functionalStatusEntryLevel.cognitiveStatusResultObservation;
exports.cognitiveStatusResultOrganizer = functionalStatusEntryLevel.cognitiveStatusResultOrganizer;
exports.functionalStatusResultObservation = functionalStatusEntryLevel.functionalStatusResultObservation;
exports.functionalStatusResultOrganizer = functionalStatusEntryLevel.functionalStatusResultOrganizer;
