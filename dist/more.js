"use strict";

/**
 * More.js - Distributable
 */

var MoreString, MoreObject, MoreArray;

MoreString = {
  /*
   * Replaces the patterns in current string with the given values.
   * Pattern can be {} or {argumentIndex} or {keyName}. {} will be replaced in the order of arguments.
   * Optionally a hash of key value pairs can be passed as last argument.
   * @param string {String} String to format
   * @params [val1, val2 ... Key Object]
   * @return formatted string
   */
  fmt: function (string) {
    var stringParts = string.split(/{(.*?)}/),
        finalString = [],
        key, value, splitPos,
        i, blankPatternCount, partCount,
        argLength, paramObject, args;

    args = finalString.slice.call(arguments);
    args.shift();

    argLength = args.length,
    paramObject = args[argLength - 1];

    if(stringParts.length > 2) {
      if(typeof paramObject !== "object") paramObject = {};

      for(i = 0, blankPatternCount = 0, partCount = stringParts.length - 1; i < partCount; i++) {
        finalString.push(stringParts[i]);
        if(key = stringParts[++i]) {
          splitPos = key.indexOf(":");
          if(splitPos !== -1) {
            value = key.substr(splitPos + 1);
            key = key.substr(0, splitPos);
          }
          else {
            value = undefined;
          }

          if(!key && blankPatternCount < argLength){
            key = args[blankPatternCount];
            blankPatternCount++;
          }

          if(paramObject.hasOwnProperty(key)) {
            value = paramObject[key];
          }
          else if(args.hasOwnProperty(key)) {
            value = args[key];
          }

          finalString.push(value);
        }
        else if(blankPatternCount < argLength){
          finalString.push(args[blankPatternCount]);
          blankPatternCount++;
        }
      }
      finalString.push(stringParts[partCount]);

      return finalString.join('');
    }

    return string;
  },

  /*
   * Removes HTML tags from a string.
   * @param string {String}
   * @return {String}
   */
  removeTags: function(string) {
    return string.replace(/<(.*?)>/g, "");
  }
};

MoreObject = {

  /*
   * Returns type of an object as a string
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
   * @param objectA {Object} First object to equate
   * @param objectB {Object} Second object to equate
   * @return {Boolean}
   */
  equals: function(objectA, objectB) {
    var property;
    for(property in objectA) {
      if(objectA[property] !== objectB[property]) {
        return false;
      }
    }
    for(property in objectB) {
      if(objectA[property] !== objectB[property]) {
        return false;
      }
    }
    return true;
  },

  /*
   * Gets the value at the specified key path
   * @params object {Object}
   * @param  path {String} Key path to a property inside the object. Dot separated
   */
  val: function(object, path) {
    var properties = path.split('.');

    while(object !== undefined && properties.length) {
      object = object[properties.shift()];
    }
    return object;
  },

  /*
   * Return an array of all values in the object
   * @params object {Object}
   * @return {Array} Array of values
   */
  values: function (object) {
    return Object.keys(object).map
    (function (key) {
      return object[key];
    });
  },

  /*
   * Return all keys of current object
   * @params object {Object}
   * @return {Array} Array of keys
   */
  keys: Object.keys,

  /*
   * Given a value does a reverse look-up for a key
   * @params object {Object}
   * @param value Any javascript variable
   * @param key {String}
   */
  keyOf: function (object, value) {
    var keys = Object.keys(object),
        key,
        index = 0,
        length = keys.length;

    while(index < length) {
      key = keys[index++];

      if(object[key] === value) {
        return key;
      }
    }
    return undefined;
  },

  /*
   * Given a value does a reverse look-up for all matching keys
   * @params object {Object}
   * @param value Any javascript variable
   * @param keys {Array}
   */
  keysOf: function (object, value) {
    return Object.keys(object).filter(function (key) {
      if(object[key] === value) {
        return key;
      }
    });
  },

  /*
   * Adds the missing forEach function for Objects
   * @params object {Object}
   * @param callback {Function} The function will be called with two arguments, key and value
   * @return none
   */
  forEach: function (object, callback, context) {
    Object.keys(object).forEach(function (key) {
      callback.call(context, key, object[key]);
    });
  },

  /*
   * Recursively merge two plain objects
   * @params targetObject {Object} Data would be merged to this object
   * @param sourceObject {Object} Object to merge
   * @param appendArray {Boolean} Default false.
   * @return
   */
  merge: function(targetObject, sourceObject, appendArray) {
    if(!MoreObject.isPlainObject(targetObject) || !MoreObject.isPlainObject(sourceObject)) {
      throw new Error(MoreString.fmt(
        "Merge Failed: Cannot merge {} and {}",
        MoreObject.typeOf(targetObject),
        MoreObject.typeOf(sourceObject)
      ));
    }

    MoreObject.keys(sourceObject).forEach(function (key) {
      var targetVal = targetObject[key],
          sourceVal = sourceObject[key];

      if(MoreObject.isPlainObject(targetVal) && MoreObject.isPlainObject(sourceVal)) {
        MoreObject.merge(targetVal, sourceVal, appendArray);
      }
      else if(Array.isArray(targetVal) && Array.isArray(sourceVal)) {
        MoreArray.merge(targetVal, sourceVal, appendArray);
      }
      else {
        targetObject[key] = sourceVal;
      }
    });

    return targetObject;
  },

  /*
   * Injects a set of values as non-enumerable properties of an object.
   * Old value if any would be available at newValue._old_.
   * @params object {Object} Object to inject to
   * @params properties {Object} Key-value hash of properties
   * @return none
   */
  inject: function (object, properties) {
    MoreObject.forEach(properties, function (key, value) {
      // Inject value
      Object.defineProperty(object, key, {
        value: value
      });
    });
  }
};

MoreArray = {

  /*
   * Returns the first element in the array
   * @params array {Array}
   * @return Value at index 0
   */
  first: function (array) {
    return array[0];
  },

  /*
   * Returns the last element in the array
   * @params array {Array}
   * @return Value at last position
   */
  last: function (array) {
    return array[array.length - 1];
  },

  /*
   * Returns true if the index is in limit
   * @params array {Array}
   * @param index {Number} Index to validate
   * @return {Boolean} True if valid, else false
   */
  validIndex: function (array, index) {
    return index >= 0 && index < array.length;
  },

  /*
   * Mainly to convert a negative index to a vlaid index from the right
   * @params array {Array}
   * @param index {Number} Index to normalize
   * @return {Number} Normalized index if valid, else undefined
   */
  normalizeIndex: function (array, index, length) {
    length = length || array.length;
    if(index < 0) index = length + index;
    if(index >= 0 && index < length) {
      return index;
    }
  },

  /*
   * Get indexes of all occurrence of an element
   * @params array {Array}
   * @param element {Object} Any javascript variable
   * @return indexes {Array} Array of indexes with the element
   */
  indexesOf: function (array, element) {
    var indexes = [],
        index = array.indexOf(element);

    while(index != -1) {
      indexes.push(index);
      index = array.indexOf(element, index + 1);
    }
    return indexes;
  },

  /*
   * Swaps values at indexes A & B
   * @params array {Array}
   * @param indexA {Number} Any value from 0...length.
   * @param indexB {Number}
   * @return status {Boolean} true if the swap was successful, else false
   */
  swap: function (array, indexA, indexB) {
    var length = array.length,
        tmp;

    indexA = array.normalizeIndex(indexA, length),
    indexB = array.normalizeIndex(indexB, length);

    if(indexA != undefined && indexB != undefined) {
      tmp = array[indexA],
      array[indexA] = array[indexB],
      array[indexB] = tmp;
      return true;
    }
    return false;
  },

  /*
   * Removes count number of value from the specified index
   * @params array {Array}
   * @param index {Number} Index to be removed from
   * @param count {Number} Number of elements to be removed starting from the given index
   * Must be > 0, and defaults to 1
   * @return {Array} The removed value(s) if successful, else undefined
   */
  removeFrom: function (array, index, count) {
    index = MoreArray.normalizeIndex(array, index);
    if(index != undefined) {
      return array.splice(index, count || 1);
    }
  },

  /*
   * Remove instances of a specific element from the array
   * @params array {Array}
   * @param element {Object} Element to be removed
   * @param count {Number} Number of elements to be removed. Must be greater than 0, by default all.
   * @return {Boolean} Actual number of deleted items
   */
  remove: function (array, element, count) {
    var index = array.indexOf(element),
        delCount = 0;

    count = count || Number.MAX_VALUE;

    while(index != -1 && delCount < count) {
      array.splice(index, 1);
      delCount++;
      index = array.indexOf(element, index);
    }

    return delCount;
  },

  /*
   * Inserts a set of elements at a position
   * @params array {Array}
   * @param index {Number} Index to insert
   * @param element1...N {Object}, any number of optional arguments that would be inserted as the values
   * @return The array if successful, else undefined
   */
  insert: function (array, index) {
    var args;

    index = MoreArray.normalizeIndex(array, index),
    args = [index, 0];

    // Todo: optimize
    args.shift.apply(arguments);
    args.shift.apply(arguments);
    args.append(arguments);

    if(index != undefined) {
      array.splice.apply(array, args);
      return array;
    }
  },

  /*
   * Append an array to the end of another
   * @params array {Array}
   * @params arrayToAppend {Array}
   * @return Current array
   */
  append: function (array, arrayToAppend) {
    // Todo: Check perf and improve
    array.push.apply(array, arrayToAppend);
    return array;
  },

  /*
   * Pushes only non-null values into the array
   * @params array {Array}
   * @params val1, [val2... valn]
   * @return Current array
   */
  filterPush: function (array) {
    for(var i = 1, count = arguments.length; i < count; i++) {
      if(arguments[i]) {
        array.push(arguments[i]);
      }
    }
    return array;
  },

  /*
   * Returns a new array of all uneque elements
   * @params array {Array}
   * @param none
   * @return {Array}
   */
  unique: function (array) {
    return array.filter(function(item, i){
      return array.indexOf(item) === i;
    }, array);
  },

  /*
   * Returns a new array of all the non-(null/undefined/zero/empty/NaN/false) values
   * @params array {Array}
   * @param none
   * @return {Array}
   */
  realValues: function (array) {
    return array.filter(function (value) {
      return value;
    });
  },

  /*
   * Recursively merge two arrays
   * @params targetArray {Array} Data would be merged to this array
   * @param sourceArray {Array} Array to merge
   * @param append {Boolean} Default false.
   * @return {Array} Current array
   */
  merge: function(targetArray, sourceArray, append) {
    var targetVal, sourceVal;

    if(!Array.isArray(targetArray) || !Array.isArray(sourceArray)) {
      throw new Error(MoreString.fmt(
        "Merge Failed: Cannot merge {} and {}",
        MoreObject.typeOf(targetObject),
        MoreObject.typeOf(sourceObject)
      ));
    }

    if(append) {
      targetArray.append(sourceArray);
    }
    else {
      for(var i = 0, length = sourceArray.length; i < length; i++) {
        targetVal = targetArray[i],
        sourceVal = sourceArray[i];

        if(MoreObject.isPlainObject(targetVal) && MoreObject.isPlainObject(sourceVal)) {
          MoreObject.merge(targetVal, sourceVal, append);
        }
        else if(Array.isArray(targetVal) && Array.isArray(sourceVal)) {
          MoreArray.merge(targetVal, sourceVal, append);
        }
        else {
          targetArray[i] = sourceVal;
        }
      }
    }

    return targetArray;
  },

  /*
   * Converts an array into a hash with value at the specified path as key
   * ie [{x:"a", y:"aa"}, {x:"b", y:"bb"}] and path 'x' will
   * give {a:{x:"a", y:"aa"}, b:{x:"b", y:"bb"}}
   * @params array {Array}
   * @param path {String}
   * @return {Object}
   */
  hashify: function (array, path) {
    return array.reduce(function (obj, element) {
      if(element) {
        obj[element.val(path)] = element;
      }
      return obj;
    }, {});
  },

  /*
   * Find first element from the array with matching value at the specified path
   * The function uses === for comparison
   * @params array {Array}
   * @param path {String}
   * @param value {*}
   * @return {*}
   */
  findBy: function (array, path, value) {
    var element;
    for(var i = 0, length = array.length; i < length; i++){
      element = array[i];
      if(element && element.val(path) === value) {
        return element;
      }
    }
  },

  /*
   * Finds all element from the array with matching value at the specified path
   * The function uses === for comparison
   * @params array {Array}
   * @param path {String}
   * @param value {*}
   * @return {*}
   */
  findAllBy: function (array, path, value) {
    return array.filter(function (element) {
      return element && element.val(path) === value;
    });
  },
};

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.more = factory()
}(this, function () {
  return {
    Object: MoreObject,
    String: MoreString,
    Array: MoreArray
  };
}));
