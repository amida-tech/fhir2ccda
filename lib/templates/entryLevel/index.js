"use strict";

var allergyEntryLevel = require("./allergyEntryLevel");
var problemEntryLevel = require("./problemEntryLevel");
var resultEntryLevel = require("./problemEntryLevel");

exports.allergyProblemAct = allergyEntryLevel.allergyProblemAct;

exports.problemConcernAct = problemEntryLevel.problemConcernAct;

exports.resultOrganizer = problemEntryLevel.resultOrganizer;
