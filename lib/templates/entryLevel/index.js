"use strict";

var allergyEntryLevel = require("./allergyEntryLevel");
var medicationEntryLevel = require("./medicationEntryLevel");
var problemEntryLevel = require("./problemEntryLevel");
var resultEntryLevel = require("./resultEntryLevel");

exports.allergyProblemAct = allergyEntryLevel.allergyProblemAct;

exports.medicationActivity = medicationEntryLevel.medicationActivity;

exports.problemConcernAct = problemEntryLevel.problemConcernAct;

exports.resultOrganizer = resultEntryLevel.resultOrganizer;
