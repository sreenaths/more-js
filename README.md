# more-js

Adds more functionality to the JavaScript data types.

## Installation

  npm install more-js

## Usage

  require('more-js');

## Functions

* #### Array
  * **[].first()** - Returns the first element in the array
  * **[].last()** - Returns the last element in the array
  * **[].validIndex(index)** - Returns true if the index is in limit
  * **[].normalizeIndex(index)** - Mainly to convert a negative index to a valid index from the right. Returns normalized index if index is valid, else undefined
  * **[].indexesOf(element)** - Get indexes of all occurrences of an element
  * **[].swap(indexA, indexB)** - Swaps values at indexes A & B, returns true if successful
  * **[].removeFrom(element, count)** - Removes count number of value from the specified index. Count must be greater than 0 and defaults to 1. Returns the removed values.
  * **[].remove(element, count)** - Remove instances of a specific element from the array
  * **[].insert(index, element1[...elementN])** - Inserts a set of elements at a position
  * **[].append(array)** - Append an array to the end of current array
  * **[].filterPush(val1, [val2...valN])** - Pushes only non-null values into the array
  * **[].unique()** - Returns a new array of all unique elements
  * **[].hashify(path)** - Converts an array into a hash with value at the specified path as key
  * **[].findBy(path, value)** - Find first element from the array with matching value at the specified path. The function uses === for comparison
  * **[].findAllBy(path, value)** - Finds all element from the array with matching value at the specified path. Uses === for comparison

* #### Object
  * Static
    * **Object.typeOf(object)** - Returns correct type of object as a string. Fixes type for array, null, date, new Boolean, new Number, new String, RegExp, NaN & Infinity.
    * **Object.isObject(object)** - Returns true for non-null objects
    * **Object.isPlainObject(object)** - Returns true for a plain objects (non-null, not array, not dom element, not window, not any other basic types)
    * **Object.isArray(object)** - Returns true if object is an Array
    * **Object.isString(object)** -Returns true if object is a String
    * **Object.isBoolean(object)** - Returns true if object is a Boolean
    * **Object.isNumber(object)** - Returns true if object is a Number
    * **Object.isFunction(object)** - Returns true if object is a Function
  * Member
    * **{}.val(path)** - Gets the value at the specified key path. Keys in the path must be dot separated
    * **{}.keys()** - Return all keys of current object
    * **{}.values()** - Return an array of all values in the object
    * **{}.keyOf(value)** - Given a value does a reverse look-up for a key
    * **{}.keysOf(value)** - Given a value does a reverse look-up for all matching keys
    * **{}.forEach(callback)** - Adds the missing forEach function to Objects
    * **{}.merge(object, appendArray)** - Recursively merges the given object to the current object

* #### String
  * **"".format([val1, val2...Key Object])** - Replaces the patterns in current string with the given values. Pattern can be {} or {argumentIndex} or {keyName}. {} will be replaced in the order of given arguments. Optionally a hash of key value pairs can be passed as last argument.
  * **"".fmt([val1, val2...Key Object])** - Just an alias for format

## Tests

  npm test

## Release History

* **0.1.0 Initial release**
* **0.2.0 Added string support**
  * Added fmt(formatter) function to String.
  * Added filterPush function to Array.
  * Added val, values, keys & forEach functions to Object.
* **0.3.0 More object functions**
  * Added isObject, isPlainObject, isArray, isString, isBoolean, isNumber, isFunction, & merge functions to Object.
* **0.4.0 More functions**
  * Added array functions first, last, validIndex, normalizeIndex, indexesOf, swap, removeFrom, remove, insert, unique.
  * Added object functions typeOf, keyOf, keysOf.
  * Added string function format, both format and fmt are aliases.
* **0.5.0 More array functions**
  * Array - hashify, findBy, findAllBy