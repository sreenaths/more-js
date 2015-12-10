"use strict"

//-- Static functions -------------------------
require("../helpers/inject")(Object.prototype, {

  /*
   * Returns type string of an object
   * @param object {Object}
   * @return {String}
   */
  typeOf: function (object) {
    var type = typeof object;
    switch(type) {
      case "object":
        if(Object.isArray(object)) {
          type = "array";
        }
        else if (object === null) {
          type = "null";
        }
        else if(object instanceof RegExp) {
          type = "regexp";
        }
        else if(object instanceof Date) {
          type = "date";
        }
        else if(object instanceof Boolean) {
          type = "boolean";
        }
        else if(object instanceof Number) {
          type = "number";
        }
        else if(object instanceof String) {
          type = "string";
        }
      break;
      case "number":
        if(isNaN(object)) {
          type = "nan";
        }
        else if (object === Infinity) {
          type = "infinity";
        }
      break;
    }
    return type;
  },

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
    if(!object ||
        typeof object !== 'object' ||
        Array.isArray(object) ||
        object.nodeType ||
        object.Object === Object) {
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
  },

  /*
   * Return true if the objects are equal
   * @param obj1 {Object} First object to equate
   * @param obj2 {Object} Second object to equate
   * @return {Boolean}
   */
  equals: function(obj1, obj2) {
    var property;
    for(property in obj1) {
      if(obj1[property] !== obj2[property]) {
        return false;
      }
    }
    for(property in obj2) {
      if(obj1[property] !== obj2[property]) {
        return false;
      }
    }
    return true;
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
   * Given a value does a reverse look-up for a key
   * @param value Any javascript variable
   * @param key {String}
   */
  keyOf: function (value) {
    var keys = this.keys(),
        key,
        index = 0,
        length = keys.length;

    while(index < length) {
      key = keys[index++];

      if(this[key] === value) {
        return key;
      }
    }
    return undefined;
  },

  /*
   * Given a value does a reverse look-up for all matching keys
   * @param value Any javascript variable
   * @param keys {Array}
   */
  keysOf: function (value) {
    var keys = [];

    this.keys().forEach(function (key) {
      if(this[key] === value) {
        keys.push(key);
      }
    }, this);

    return keys;
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
    if(!Array.isPlainObject(object)) {
      throw new Error("Merge Failed: Cannot merge {} and {}".fmt(Object.typeOf(this), Object.typeOf(object)));
    }

    Object.keys(object).forEach(function (key) {
      var val = this[key];
      if(
        (Array.isPlainObject(val) && Object.isPlainObject(object[key])) ||
        (Array.isArray(val) && Object.isArray(object[key]))
      ) {
        this[key].merge(object[key], appendArray);
      }
      else {
        this[key] = object[key];
      }
    }, this);

    return this;
  }
});
