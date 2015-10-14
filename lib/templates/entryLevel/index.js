'use strict';

var allergyEntryLevel = require('./allergyEntryLevel');
var medicationEntryLevel = require('./medicationEntryLevel');
var problemEntryLevel = require('./problemEntryLevel');
var resultEntryLevel = require('./resultEntryLevel');
var encounterEntryLevel = require('./encounterEntryLevel');

exports.allergyProblemAct = allergyEntryLevel.allergyProblemAct;

exports.medicationActivity = medicationEntryLevel.medicationActivity;

exports.problemConcernAct = problemEntryLevel.problemConcernAct;

exports.resultOrganizer = resultEntryLevel.resultOrganizer;

exports.encounterActivities = encounterEntryLevel.encounterActivities;
