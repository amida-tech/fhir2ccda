"use strict";

var allergyEntryLevel = require("./allergyEntryLevel");
var problemEntryLevel = require("./problemEntryLevel");
var resultEntryLevel = require("./resultEntryLevel");

exports.allergyProblemAct = allergyEntryLevel.allergyProblemAct;

exports.problemConcernAct = problemEntryLevel.problemConcernAct;

exports.resultOrganizer = resultEntryLevel.resultOrganizer;
