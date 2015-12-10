"use strict"

// A temporary array instance for accessing functionalities
var tA = [];

require("../helpers/inject")(Array.prototype, {
  /*
   * Returns the first element in the array
   * @params none
   * @return Value at index 0
   */
  first: function () {
    return this[0];
  },

  /*
   * Returns the last element in the array
   * @params none
   * @return Value at last position
   */
  last: function () {
    return this[this.length - 1];
  },

  /*
   * Returns true if the index is in limit
   * @param index {Number} Index to validate
   * @return {Boolean} True if valid, else false
   */
  validIndex: function (index) {
    return index >= 0 && index < this.length;
  },

  /*
   * Mainly to convert a negative index to a vlaid index from the right
   * @param index {Number} Index to normalize
   * @return {Number} Normalized index if valid, else undefined
   */
  normalizeIndex: function (index, length) {
    length = length || this.length;
    if(index < 0) index = length + index;
    if(index >= 0 && index < length) {
      return index;
    }
  },

  /*
   * Get indexes of all occurrence of an element
   * @param element {Object} Any javascript variable
   * @return indexes {Array} Array of indexes with the element
   */
  indexesOf: function (element) {
    var indexes = [],
        index = this.indexOf(element);

    while(index != -1) {
      indexes.push(index);
      index = this.indexOf(element, index + 1);
    }
    return indexes;
  },

  /*
   * Swaps values at indexes A & B
   * @param indexA {Number} Any value from 0...length.
   * @param indexB {Number}
   * @return status {Boolean} true if the swap was successful, else false
   */
  swap: function (indexA, indexB) {
    var length = this.length,
        tmp;

    indexA = this.normalizeIndex(indexA, length),
    indexB = this.normalizeIndex(indexB, length);

    if(indexA != undefined && indexB != undefined) {
      tmp = this[indexA],
      this[indexA] = this[indexB],
      this[indexB] = tmp;
      return true;
    }
    return false;
  },

  /*
   * Removes count number of value from the specified index
   * @param index {Number} Index to be removed from
   * @param count {Number} Number of elements to be removed starting from the given index
   * Must be > 0, and defaults to 1
   * @return {Array} The removed value(s) if successful, else undefined
   */
  removeFrom: function (index, count) {
    index = this.normalizeIndex(index);
    if(index != undefined) {
      return this.splice(index, count || 1);
    }
  },

  /*
   * Remove instances of a specific element from the array
   * @param element {Object} Element to be removed
   * @param count {Number} Number of elements to be removed. Must be greater than 0, by default all.
   * @return {Boolean} Actual number of deleted items
   */
  remove: function (element, count) {
    var index = this.indexOf(element),
        delCount = 0;

    count = count || Number.MAX_VALUE;

    while(index != -1 && delCount < count) {
      this.splice(index, 1);
      delCount++;
      index = this.indexOf(element, index);
    }

    return delCount;
  },

  /*
   * Inserts a set of elements at a position
   * @param index {Number} Index to insert
   * @param element1...N {Object}, any number of optional arguments that would be inserted as the values
   * @return The array if successful, else undefined
   */
  insert: function (index) {
    var args;

    index = this.normalizeIndex(index),
    args = [index, 0];

    tA.shift.apply(arguments);
    args.append(arguments);

    if(index != undefined) {
      this.splice.apply(this, args);
      return this;
    }
  },

  /*
   * Append an array to the end of current array
   * @params array {Array}
   * @return Current array
   */
  append: function (array) {
    this.push.apply(this, array);
    return this;
  },

  /*
   * Pushes only non-null values into the array
   * @params val1, [val2... valn]
   * @return Current array
   */
  filterPush: function () {
    for(var i = 0, count = arguments.length; i < count; i++) {
      if(arguments[i]) {
        this.push(arguments[i]);
      }
    }
    return this;
  },

  /*
   * Returns a new array of all uneque elements
   * @param none
   * @return {Array}
   */
  unique: function () {
    return this.filter(function(item, i){
      return this.indexOf(item) === i;
    }, this);
  },

  /*
   * Returns a new array of all the non-(null/undefined/zero/empty/NaN/false) values
   * @param none
   * @return {Array}
   */
  realValues: function () {
    return this.filter(function (value) {
      return value;
    });
  },

  /*
   * Recursively merge an array to current array
   * @param array {Array} Array to merge
   * @param appendArray {Boolean} Default false.
   * @return {Array} Current array
   */
  merge: function(array, appendArray) {
    var val;
    if(!Array.isArray(array)) {
      throw new Error("Merge Failed: Cannot merge {} and {}".fmt(Object.typeOf(this), Object.typeOf(array)));
    }

    if(appendArray) {
      this.append(array);
    }
    else {
      for(var i = 0, length = array.length; i < length; i++) {
        val = this[i];
        if(
          (Array.isPlainObject(val) && Object.isPlainObject(array[i])) ||
          (Array.isArray(val) && Object.isArray(array[i]))
        ) {
          val.merge(array[i]);
        }
        else {
          this[i] = array[i];
        }
      }
    }

    return this;
  },

  /*
   * Converts an array into a hash with value at the specified path as key
   * ie [{x:"a", y:"aa"}, {x:"b", y:"bb"}] and path 'x' will
   * give {a:{x:"a", y:"aa"}, b:{x:"b", y:"bb"}}
   * @param path {String}
   * @return {Object}
   */
  hashify: function (path) {
    return this.reduce(function (obj, element) {
      if(element) {
        obj[element.val(path)] = element;
      }
      return obj;
    }, {});
  },

  /*
   * Find first element from the array with matching value at the specified path
   * The function uses === for comparison
   * @param path {String}
   * @param value {*}
   * @return {*}
   */
  findBy: function (path, value) {
    var element;
    for(var i = 0, length = this.length; i < length; i++){
      element = this[i];
      if(element && element.val(path) === value) {
        return element;
      }
    }
  },

  /*
   * Finds all element from the array with matching value at the specified path
   * The function uses === for comparison
   * @param path {String}
   * @param value {*}
   * @return {*}
   */
  findAllBy: function (path, value) {
    return this.filter(function (element) {
      return element && element.val(path) === value;
    });
  },

});