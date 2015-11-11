"use strict";

var chai = require('chai');

var fs = require("fs");
var path = require('path');

var _ = require('lodash');

var fhir2ccda = require('../../index');

var expect = chai.expect;

describe('bundle to ccda vs expected', function () {
    var sampleDir = null;
    before(function () {
        sampleDir = path.join(__dirname, "../samples/bundle");
        expect(sampleDir).not.to.equal(null);
    });

    it('bundle 0', function () {
        var filepath = path.join(sampleDir, 'bundle_0.json');
        var sample = require(filepath);
        var ccda = fhir2ccda.generateCCD(sample, {
            json: true
        });
        var expectedCcda = require(path.join(sampleDir, 'ccda_0.json'));
        expect(ccda).to.deep.equal(expectedCcda);
    });
});
