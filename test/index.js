"use strict"

require('../index');

var expect = require('chai').expect,
    assert = require('chai').assert;

//-- Array ---------------------------
describe('Array', function() {
  it('[].first', function() {
    var array = [1, 2, 3, 4];
    expect(array.first()).to.eql(1);
    expect([].first()).to.eql(undefined);
  });

  it('[].last', function() {
    var array = [1, 2, 3, 4];
    expect(array.last()).to.eql(4);
    expect([].last()).to.eql(undefined);
  });

  it('[].validIndex', function() {
    var array = [1, 2, 3, 4];
    expect(array.validIndex(0)).to.be.true;
    expect(array.validIndex(-1)).to.be.false;
    expect(array.validIndex(4)).to.be.false;
  });

  it('[].normalizeIndex', function() {
    var array = [1, 2, 3, 4];
    expect(array.normalizeIndex(0)).to.eql(0);
    expect(array.normalizeIndex(3)).to.eql(3);
    expect(array.normalizeIndex(-1)).to.eql(3);
    expect(array.normalizeIndex(-4)).to.eql(0);

    expect(array.normalizeIndex(4)).to.eql(undefined);
    expect(array.normalizeIndex(-5)).to.eql(undefined);
  });

  it('[].indexesOf', function() {
    var array = [1, 2, 1, 4];
    expect(array.indexesOf(1)).to.eql([0, 2]);
  });

  it('[].swap', function() {
    var array = [1, 2, 3, 4];

    expect(array.swap(0, 2)).to.be.true;
    expect(array).to.eql([ 3, 2, 1, 4]);

    expect(array.swap(-2, 1)).to.be.true;
    expect(array).to.eql([ 3, 1, 2, 4]);

    expect(array.swap(-2, 2)).to.be.true;
    expect(array).to.eql([ 3, 1, 2, 4]);

    expect(array.swap(0, 6)).to.be.false;
    expect(array.swap(-1, 6)).to.be.false;
    expect(array.swap(-10, 3)).to.be.false;
  });

  it('[].removeFrom', function() {
    var array = [1, 2, 3, 4, 5, 6, 7];
    expect(array.removeFrom(2)).to.eql([3]);
    expect(array.removeFrom(2, 2)).to.eql([4, 5]);
    expect(array.removeFrom(-2)).to.eql([6]);

    expect(array.removeFrom(10)).to.eql(undefined);
    expect(array.removeFrom(-10)).to.eql(undefined);
  });

  it('[].insert', function() {
    var array = [1, 2, 3, 4];

    expect(array.insert(2)).to.eql([1, 2, 3, 4]);
    expect(array.insert(2, 8, 9)).to.eql([1, 2, 8, 9, 3, 4]);
    expect(array.insert(-1, 10, 11)).to.eql([1, 2, 8, 9, 3, 10, 11, 4]);

    expect(array.insert(20)).to.eql(undefined);
    expect(array.insert(-20)).to.eql(undefined);
  });

  it('[].remove', function() {
    var array = [3, -1, 0, 1, 2, 2, 3];

    expect(array.remove(1)).to.eql(1);
    expect(array).to.eql([3, -1, 0, 2, 2, 3]);

    expect(array.remove(2)).to.eql(2);
    expect(array).to.eql([3, -1, 0, 3]);

    expect(array.remove(3, 1)).to.eql(1);
    expect(array).to.eql([-1, 0, 3]);

    expect(array.remove(10)).to.eql(0);
  });

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

  it('[].unique', function() {
    var array = [1, 2, 1, 4, 2, 3];
    expect(array.unique()).to.eql([1, 2, 4, 3]);
    expect(array).to.eql([1, 2, 1, 4, 2, 3]);
  });

  it('[].realValues', function() {
    var array = [1, null, 2, 3, null, false, "", 4];
    expect(array.realValues()).to.eql([1, 2, 3, 4]);
  });

  it('[].merge', function() {
    // Array merge
    var array = [1, 2, 3, 4];
    expect(array.merge([5, 6])).to.eql([5, 6, 3, 4]);

    // Array append
    array = [1, 2, 3, 4];
    expect(array.merge([5, 6], true)).to.eql([1, 2, 3, 4, 5, 6]);

    // Object inside array merge
    array = [{x: 1}, 1, 2];
    expect(array.merge([{y: 2}, 1, 2])).to.eql([{x: 1, y: 2}, 1, 2]);

    // Array inside object inside array merge
    array = [{x: 1, z: [1, 2]}, 1, 2];
    expect(array.merge([{y: 2, z: [3]}, 1, 2])).to.eql([{x: 1, y: 2, z: [3, 2]}, 1, 2]);

    // Object inside array inside object inside array merge
    array = [{x: 1, z: [{a: 1}, 2]}, 1, 2];
    expect(array.merge([{y: 2, z: [{b: 2}]}, 1, 2])).to.eql([{x: 1, y: 2, z: [{a:1, b:2}, 2]}, 1, 2]);

    // Array over undefined
    array = [undefined, 1, 2];
    expect(array.merge([{y: 2}, 3])).to.eql([{y: 2}, 3, 2]);

    // Undefined over array
    array = [[1], 1, 2];
    expect(array.merge([undefined, 3])).to.eql([undefined, 3, 2]);

    //Array over object
    array = [{x: 1}, 1, 2];
    expect(array.merge([[1], 1, 2])).to.eql([[1], 1, 2]);

    //Negative case
    function invalidMerge() {
      var array = [1, 2];
      array.merge(undefined);
    }
    expect(invalidMerge).to.throw(Error);

    //Negative case
    function invalidMerge() {
      var array = [1, 2];
      array.merge({});
    }
    expect(invalidMerge).to.throw(Error);
  });

  it('[].hashify', function() {
    var array = [{x:"a", y:1}, {x:"b", y:2}, {x:"c", y:3}];
    expect(array.hashify('x')).to.eql({
      "a": array[0],
      "b": array[1],
      "c": array[2]
    });

    var array = [{x:{xx: "a"}, y:1}, {x:{xx: "b"}, y:2}, {x:{xx: "c"}, y:3}];
    expect(array.hashify('x.xx')).to.eql({
      "a": array[0],
      "b": array[1],
      "c": array[2]
    });
  });

  it('[].findBy', function() {
    var array = [{x:"a", y:1}, {x:"b", y:2}, {x:"c", y:3}, {x:"d", y:"3"}];
    expect(array.findBy('x', "b")).to.eql(array[1]);

    expect(array.findBy('y', "3")).to.eql(array[3]);
    expect(array.findBy('x', "e")).to.eql(undefined);
    expect(array.findBy('z', "b")).to.eql(undefined);

    array = [{x:{xx:"a"}, y:1}, {x:"b", y:2}, {x:"c", y:3}, {x:"d", y:"3"}];
    expect(array.findBy('x.xx', "a")).to.eql(array[0]);
  });

  it('[].findAllBy', function() {
    var array = [{x:"a", y:1}, {x:"b", y:2}, {x:"c", y:2}, {x:"d", y:"2"}];
    expect(array.findAllBy('y', 2)).to.eql([array[1], array[2]]);

    expect(array.findBy('x', "e")).to.eql(undefined);
    expect(array.findBy('z', "b")).to.eql(undefined);

    array = [{x:{xx:"a"}, y:1}, {x:{xx:"a"}, y:2}, {x:"c", y:3}, {x:"d", y:"3"}];
    expect(array.findAllBy('x.xx', "a")).to.eql([array[0], array[1]]);
  });

});

//-- Object --------------------------
describe('Object', function() {

  it('Object.typeOf', function() {
    expect(Object.typeOf(1)).to.eql("number");
    expect(Object.typeOf("")).to.eql("string");
    expect(Object.typeOf(true)).to.eql("boolean");
    expect(Object.typeOf({})).to.eql("object");
    expect(Object.typeOf(function () {})).to.eql("function");
    expect(Object.typeOf(undefined)).to.eql("undefined");
    expect(Object.typeOf([])).to.eql("array");
    expect(Object.typeOf(null)).to.eql("null");
    expect(Object.typeOf(NaN)).to.eql("nan");
    expect(Object.typeOf(new Date())).to.eql("date");
    expect(Object.typeOf(1 / 0)).to.eql("infinity");
    expect(Object.typeOf(new Boolean())).to.eql("boolean");
    expect(Object.typeOf(new Number())).to.eql("number");
    expect(Object.typeOf(new String())).to.eql("string");
    expect(Object.typeOf(/s/)).to.eql("regexp");
  });

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

  it('{}.equals', function() {
    var obj = {a: 1},
        fun = function () {};
    expect(obj.equals({a:1})).to.be.true;
    expect(obj.equals({b:2})).to.be.false;

    obj = {a:1, b:2};
    expect(obj.equals({a:1, b:2})).to.be.true;
    expect(obj.equals({b:2, a:1})).to.be.true;

    obj = {a:fun};
    expect(obj.equals({a:fun})).to.be.true;
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

  it('{}.keyOf', function() {
    var valObj = {},
        obj = {a: 1, b: 2, c: 3, d: valObj, e: 'e'};

    expect(obj.keyOf(1)).to.eql('a');
    expect(obj.keyOf(4)).to.eql(undefined);

    expect(obj.keyOf(valObj)).to.eql('d');

    expect(obj.keyOf(undefined)).to.eql(undefined);
  });

  it('{}.keysOf', function() {
    var valObj = {},
        obj = {a: 1, b: valObj, c: 3, d: valObj, e: 'e'};

    expect(obj.keysOf(1)).to.eql(['a']);
    expect(obj.keysOf(valObj)).to.eql(['b', 'd']);

    expect(obj.keysOf(undefined)).to.have.length(0);
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
    expect({a: 1, b: [{x: 1}, 2]}.merge({b: [{y: 2}, 2, 3]})).to.eql({a: 1, b:[{x: 1, y: 2}, 2, 3]});
    expect({a: 1, b: [{x: [1]}, 2]}.merge({b: [{x: [2]}, 2, 3]})).to.eql({a: 1, b:[{x: [2]}, 2, 3]});

    // Array append
    expect({a: 1, b: [2, 3]}.merge({b: [4]}, true)).to.eql({a: 1, b:[2, 3, 4]});
    expect({a: 1, b: [{x: [1]}, 2]}.merge({b: [{x: [2]}, 2, 3]})).to.eql({a: 1, b: [{x: [2]}, 2, 3]});

    //Negative case
    function invalidMerge() {
      var obj = {a: 1, b: {c: 3}};
      obj.merge(undefined);
    }
    expect(invalidMerge).to.throw(Error);

    //Negative case
    function invalidMerge() {
      var obj = {a: 1, b: {c: 3}};
      obj.merge([]);
    }
    expect(invalidMerge).to.throw(Error);
  });

  it('{}.inject', function() {
    var obj = {a: 1};
    obj.inject({b: 2, c: 3});

    expect(obj.keys()).to.have.length(1);
    expect(obj.keys()).to.eql(["a"]);

    expect(obj.values()).to.have.length(1);
    expect(obj.values()).to.eql([1]);

    assert.equal(obj.val("a"), 1);
    assert.equal(obj.val("b"), 2);
    assert.equal(obj.val("c"), 3);
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
    assert.equal("abc".fmt({}), "abc");

    assert.equal("abc{}".fmt(0), "abc0");
    assert.equal("abc{}".fmt(false), "abcfalse");

    // Auto index
    assert.equal("a{}b{}c".fmt(1, 2), "a1b2c");
    assert.equal("a{}b{}c".fmt(0, 1), "a0b1c");
    assert.equal("a{}{}c".fmt(1, 2), "a12c");
    assert.equal("a{}{}{}c".fmt(1, 2), "a12c"); // False

    // Indexed
    assert.equal("a{0}b{1}c".fmt(1, 2), "a1b2c");
    assert.equal("a{1}b{0}c".fmt(1, 2), "a2b1c");

    // Key based
    assert.equal("a{x}b{y}c".fmt(paramObj), "a1b2c");
    assert.equal("a{y}b{x}c".fmt(paramObj), "a2b1c");

    assert.equal("a{x}b{y}c".fmt({x: 0, y: false}), "a0bfalsec");

    // Index + Key
    assert.equal("a{}{0}b{y}c".fmt(3, paramObj), "a33b2c");
    assert.equal("a{}{0}{}b{y}c".fmt(3, 4, paramObj), "a334b2c");
    assert.equal("a{}{1}{}b{y}c".fmt(3, 4, paramObj), "a344b2c");
    assert.equal("a{1}{}{1}b{y}c".fmt(3, 4, paramObj), "a434b2c");

    //Escaped
    assert.equal("a}b{}c".fmt(1, 2), "a}b1c");
    //assert.equal("a\{\}b{}c".fmt(1, 2), "a{b1c"); // TODO: Dont convert escaped patterns

    //Default value
    assert.equal("a{x:1}b{y:2}c".fmt(), "a1b2c");
    assert.equal("a{x:0}b{y:2}c".fmt(), "a0b2c");
    assert.equal("a{x:1}b{y:2}c".fmt({x: 0}), "a0b2c");

    assert.equal("a{:1}b{y}c".fmt(), "a1bc");
    assert.equal("a{:1}b{y}c".fmt(0), "a0bc");

    assert.equal("a{x:1}b{y}c".fmt(), "a1bc");
    assert.equal("a{x:1}b{y:}c".fmt(), "a1bc");
  });

  it('"".removeTags', function() {

    assert.equal("abc".removeTags(), "abc");
    assert.equal("<a>abc</a>".removeTags(), "abc");
    assert.equal("ab<a>c".removeTags(), "abc");
    assert.equal("abc<br/>".removeTags(), "abc");

    assert.equal("<a>ab>c</a>".removeTags(), "ab>c");
    assert.equal("<a>a<bc</a>".removeTags(), "a");

    assert.equal("<a>abc</a>>d".removeTags(), "abc>d");
    assert.equal("<a>abc</a><d".removeTags(), "abc<d");
  });
});
