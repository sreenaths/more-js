"use strict"

require('../index');

var expect = require('chai').expect;

describe('Array', function() {
  it('array.append', function() {
    var array = [1, 2];
    array.append([3, 4]);
    expect(array).to.have.length(4);
  });
});