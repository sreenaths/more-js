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
  it('Object.isObject', function() {
    var obj = {};
    expect(Object.isObject(obj)).to.be.true;
    obj = [];
    expect(Object.isObject(obj)).to.be.true;
    obj = null;
    expect(Object.isObject(obj)).to.be.false;
    obj = undefined;
    expect(Object.isObject(obj)).to.be.false;
    obj = function () {};
    expect(Object.isPlainObject(obj)).to.be.false;
  });

  it('Object.isPlainObject', function() {
    var obj = {};
    expect(Object.isPlainObject(obj)).to.be.true;
    obj = [];
    expect(Object.isPlainObject(obj)).to.be.false;
    obj = null;
    expect(Object.isPlainObject(obj)).to.be.false;
    obj = undefined;
    expect(Object.isPlainObject(obj)).to.be.false;
    obj = function () {};
    expect(Object.isPlainObject(obj)).to.be.false;
  });

  it('Object.isArray', function() {
    var obj = [];
    expect(Object.isArray(obj)).to.be.true;
    obj = {};
    expect(Object.isArray(obj)).to.be.false;
  });

  it('Object.isString', function() {
    var obj = "str";
    expect(Object.isString(obj)).to.be.true;
    obj = {};
    expect(Object.isString(obj)).to.be.false;
  });

  it('Object.isBoolean', function() {
    var obj = true;
    expect(Object.isBoolean(obj)).to.be.true;
    obj = {};
    expect(Object.isBoolean(obj)).to.be.false;
  });

  it('Object.isNumber', function() {
    var obj = 1;
    expect(Object.isNumber(obj)).to.be.true;
    obj = {};
    expect(Object.isNumber(obj)).to.be.false;
  });

  it('Object.isFunction', function() {
    var obj = function () {};
    expect(Object.isFunction(obj)).to.be.true;
    obj = {};
    expect(Object.isFunction(obj)).to.be.false;
  });

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

  it('{}.merge', function() {
    // Normal
    expect({a: 1, b: 2}.merge({c: 3})).to.eql({a: 1, b: 2, c: 3});
    expect({a: 1, b: 2, c: 3}.merge({b: "A"})).to.eql({a: 1, b: "A", c: 3});
    expect({a: 1, b: 2, c: 3}.merge({b: {d: 4}})).to.eql({a: 1, b: {d: 4}, c: 3});

    // Nested
    expect({a: 1, b: {c: 3}}.merge({b: {d: 4}})).to.eql({a: 1, b:{c: 3, d: 4}});

    // Array merge
    expect({a: 1, b: [2, 3]}.merge({b: [4]})).to.eql({a: 1, b:[4, 3]});

    // Array append
    expect({a: 1, b: [2, 3]}.merge({b: [4]}, true)).to.eql({a: 1, b:[2, 3, 4]});

    //Negative case
    function invalidMerge() {
      var obj = {a: 1, b: {c: 3}};
      obj.merge(undefined);
    }
    expect(invalidMerge).to.throw(Error);
  });
});

//-- String --------------------------
describe('String', function() {
  it('"".fmt', function() {
    var paramObj = {
      x: 1,
      y: 2
    };

    assert.equal("abc".fmt(), "abc");
    assert.equal("abc".fmt(1, 2), "abc");
    assert.equal("abc{}".fmt(), "abc");

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
