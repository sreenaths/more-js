"use strict"

var Object = require('../types/object');

/*
 * Just for backward compatibility with version < 0.6
 * From version 0.7 all the functions have been moved out of global Object
 */
module.exports = {
  typeOf: Object.typeOf,
  isObject: Object.isObject,
  isPlainObject: Object.isPlainObject,
  isArray: Object.isArray,
  isString: Object.isString,
  isBoolean: Object.isBoolean,
  isNumber: Object.isNumber,
  isFunction: Object.isFunction
};