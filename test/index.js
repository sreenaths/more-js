"use strict"

require('../index');

var expect = require('chai').expect,
    assert = require('chai').assert;

//-- Array ---------------------------
describe('Array', function() {
  it('[].append', function() {
    var array = [1, 2];
    array.append([3, 4]);
    expect(array).to.have.length(4);
    expect(array).to.eql([ 1, 2, 3, 4]);
  });

  it('[].filterPush', function() {
    var array = [1, 2];

    array.filterPush(3, null, 4);
    expect(array).to.have.length(4);
    expect(array).to.eql([ 1, 2, 3, 4]);

    array.filterPush("", "0", 5);
    expect(array).to.have.length(6);
    expect(array).to.eql([ 1, 2, 3, 4, "0", 5]);
  });
});

//-- Object --------------------------
describe('Object', function() {
  it('{}.val', function() {
    var obj = {a: {b: {c: 101}}};
    assert.equal(obj.val('a.b.c'), obj.a.b.c);
  });

  it('{}.keys', function() {
    var obj = {a: 1, b: 2, c: 3};
    expect(obj.keys()).to.have.length(3);
    expect(obj.keys()).to.eql([ "a", "b", "c"]);
  });

  it('{}.values', function() {
    var obj = {a: 1, b: 2, c: 3};
    expect(obj.values()).to.have.length(3);
    expect(obj.values()).to.eql([ 1, 2, 3]);
  });

  it('{}.forEach', function() {
    var obj = {a: 1, b: 2, c: 3},
        values = [];
    obj.forEach(function (val) {
      values.push(val);
    });
    expect(obj.values()).to.have.length(3);
    expect(obj.values()).to.eql([ 1, 2, 3]);
  });
});

//-- String --------------------------
describe('String', function() {
  it('"".fmt', function() {
    var paramObj = {
      x: 1,
      y: 2
    };

    assert.equal("abc".fmt(1, 2), "abc");
    // Auto index
    assert.equal("a{}b{}c".fmt(1, 2), "a1b2c");
    assert.equal("a{}{}c".fmt(1, 2), "a12c");
    assert.equal("a{}{}{}c".fmt(1, 2), "a12c"); // False

    // Indexed
    assert.equal("a{0}b{1}c".fmt(1, 2), "a1b2c");
    assert.equal("a{1}b{0}c".fmt(1, 2), "a2b1c");

    // Key based
    assert.equal("a{x}b{y}c".fmt(paramObj), "a1b2c");
    assert.equal("a{y}b{x}c".fmt(paramObj), "a2b1c");

    // Index + Key
    assert.equal("a{}{0}b{y}c".fmt(3, paramObj), "a33b2c");
    assert.equal("a{}{0}{}b{y}c".fmt(3, 4, paramObj), "a334b2c");
    assert.equal("a{}{1}{}b{y}c".fmt(3, 4, paramObj), "a344b2c");
    assert.equal("a{1}{}{1}b{y}c".fmt(3, 4, paramObj), "a434b2c");

    //Escaped
    assert.equal("a}b{}c".fmt(1, 2), "a}b1c");
    //assert.equal("a\{\}b{}c".fmt(1, 2), "a{b1c"); // TODO: Dont convert escaped patterns
  });
});
