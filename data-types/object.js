"use strict"

//-- Static functions -------------------------
require("../helpers/inject")(Object.prototype, {
  /*
   * Returns true for non-null objects
   * @param object {Object}
   * @return {Boolean}
   */
  isObject: function (object) {
    return !!object && typeof object === 'object';
  },

  /*
   * Returns true for a plain objects - non-null, not array, not dom element, not window, not any other basic types
   * @param object {Object}
   * @return {Boolean}
   */
  isPlainObject: function (object) {
    // Check for null || object || array || dom element || window
    if(!object || typeof object !== 'object' || Array.isArray(object) || object.nodeType || object.Object === Object) {
      return false;
    }
    return true;
  },

  /*
   * Returns true if object is an Array
   * @param object {Object}
   * @return {Boolean}
   */
  isArray: Array.isArray,

  /*
   * Returns true if object is a String
   * @param object {Object}
   * @return {Boolean}
   */
  isString: function (object) {
    return typeof object === 'string';
  },

  /*
   * Returns true if object is Boolean
   * @param object {Object}
   * @return {Boolean}
   */
  isBoolean: function (object) {
    return typeof object === 'boolean';
  },

  /*
   * Returns true if object is a Number
   * @param object {Object}
   * @return {Boolean}
   */
  isNumber: function (object) {
    return typeof object === 'number';
  },

  /*
   * Returns true if object is NaN
   * @param object {Object}
   * @return {Boolean}
   */
  isFunction: function (object) {
    return typeof object === 'function';
  }
});

//-- Member functions -------------------------
require("../helpers/inject")(Object.prototype, {

  /*
   * Gets the value at the specified key path
   * @param  path {String} Key path to a property inside the object. Dot separated
   */
  val: function(path) {
    var properties = path.split('.'),
        value = this;

    while(value !== undefined && properties.length) {
      value = value[properties.shift()];
    }
    return value;
  },

  /*
   * Return all keys of current object
   @param none
   @return {Array} Array of keys
   */
  keys: function () {
    return Object.keys(this);
  },

  /*
   * Return an array of all values in the object
   * @param none
   * @return {Array} Array of values
   */
  values: function () {
    var values = [];
    Object.keys(this).forEach(function (key) {
      values.push(this[key]);
    }, this);
    return values;
  },

  /*
   * Adds the missing forEach function for Objects
   * @param callback {Function} The function will be called with two arguments, key and value
   * @return none
   */
  forEach: function (callback) {
    Object.keys(this).forEach(function (key) {
      callback(key, this[key]);
    }, this);
  },

  /*
   * Recursively merge an object to the current object
   * @param object {Object} Object to merge
   * @param appendArray {Boolean} Default false.
   */
  merge: function(object, appendArray) {
    if(!object) {
      throw new Error("Merge Failed: Cannot merge {} and {}".fmt(this, object));
    }

    Object.keys(object).forEach(function (key) {
      if(Object.isArray(this[key]) && Object.isArray(object[key])) {
        if(appendArray) {
          this[key].append(object[key]);
        }
        else {
          this[key].merge(object[key]);
        }
      }
      else if(Object.isPlainObject(this[key]) && Object.isPlainObject(object[key])) {
        this[key].merge(object[key], appendArray);
      }
      else {
        this[key] = object[key];
      }
    }, this);
    return this;
  }
});
