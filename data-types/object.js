"use strict"

require("../helpers/protoInject")(Object, {

  /*
   * Gets the value at the specified path
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
  }
});
