# more-js

Adds more functionalities to the javascript data types.

## Installation

  npm install more-js

## Usage

  require('more-js');

## Functions
* #### Array
  * **[].append(array)** - Append an array to the end of current array
  * **[].filterPush(val1, [val2... valn])** - Pushes only non-null values into the array
* #### Object
  * Static
    * **Object.isObject(object)** - Returns true for non-null objects
    * **Object.isPlainObject(object)** - Returns true for a plain objects - non-null, not array, not dom element, not window, not any other basic types
    * **Object.isArray(object)** - Returns true if object is an Array
    * **Object.isString(object)** -Returns true if object is an String
    * **Object.isBoolean(object)** - Returns true if object is an Boolean
    * **Object.isNumber(object)** - Returns true if object is an Number
    * **Object.isFunction(object)** - Returns true if object is an Function
  * Member
    * **{}.val(path)** - Gets the value at the specified key path. Keys must be dot seperated
    * **{}.keys()** - Return all keys of current object
    * **{}.values()** - Return an array of all values in the object
    * **{}.forEach(callback)** - Adds the missing forEach function for Objects
    * **{}.merge(object, appendArray)** - Recursively merge an object to the current object
* #### String
  * **"".fmt([val1, val2 ... Key Object])** - Replaces the patterns in current string with the given values. Pattern can be {} or {argumentIndex} or {keyName}. {} will be replaced in the order of given arguments. Optionally a hash of key value pares can be passed a slast argument.

## Tests

  npm test

## Release History

* **0.1.0 Initial release**
* **0.2.0 Added string support**
  1. Added fmt(formatter) function to String.
  2. Added filterPush function to Array.
  3. Added val, values, keys & forEach functions to Object.
* **0.3.0 More object functions**
  * Added isObject, isPlainObject, isArray, isString, isBoolean, isNumber, isFunction, & merge functions to Object.