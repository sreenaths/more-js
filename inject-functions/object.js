"use strict"

var Object = require('../types/object');

/*
 * Opting for manual linking for better performance
 */
module.exports = {
  typeOf: function () {
    return Object.typeOf(this);
  },
  isObject: function () {
    return Object.isObject(this);
  },
  isPlainObject: function () {
    return Object.isPlainObject(this);
  },
  isArray: function () {
    return Object.isArray(this);
  },
  isString: function () {
    return Object.isString(this);
  },
  isBoolean: function () {
    return Object.isBoolean(this);
  },
  isNumber: function () {
    return Object.isNumber(this);
  },
  isFunction: function () {
    return Object.isFunction(this);
  },

  equals: function (object) {
    return Object.equals(this, object);
  },

  val: function (path) {
    return Object.val(this, path);
  },
  values: function () {
    return Object.values(this);
  },

  keys: function () {
    return Object.keys(this);
  },
  keyOf: function (value) {
    return Object.keyOf(this, value);
  },
  keysOf: function (value) {
    return Object.keysOf(this, value);
  },

  forEach: function (callback, context) {
    return Object.forEach(this, callback, context);
  },

  merge: function (sourceObject, appendArrays) {
    return Object.merge(this, sourceObject, appendArrays);
  },
  inject: function (properties) {
    return Object.inject(this, properties);
  }
};
