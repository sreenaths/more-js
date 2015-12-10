# more-js

More functions to work with.

## Installation

  npm install --save more-js

## Usage
There are two ways to use the functions:
### 1. As static functions (from v0.7)
Just require the respective type and start using the static functions. For instance `var Array = require('more-js/types/array')`, would give you an Array namespace with all the functions. Then you can do operations like `var firstVal = Array.first(arr)`.
* First argument fo all static function must fo of the respective type, i.e an Array object for all functions under Array.
* Currently functions are available for Arrays, Object & Strings. More types are in the pipeline.
* Requiring any file under `more-js/types` would return a Namespace and they are not extended from any of the native data types.

Sample:
```
var Array = require('more-js/types/array');
var Object = require('more-js/types/object');
var String = require('more-js/types/string');

Array.unique([1, 2, 2, 3]); // [1,2,3]
Object.typeOf([1, 2]); // array
String.fmt("{} text", "Sample"); // Sample text
String.fmt("Name: {lastName} {firstName}", {firstName:"Narendra", lastName: "Modi"}); // Name: Modi Narendra
```
### 2. As member function (Would be deprecated)

You can have all these static members added as part the respective JavaScript data types. Just require more-js somewhere in your project, `require('more-js');`. Considering performance and safety, option #1 is a better approach.

Once required, all the functions will be available under the respective data types as member function. i.e, you would be able to do the following.
```
[1, 3, 3, 4].unique().first(); // 1
"{} text".fmt("Sample"); // Sample text
```

## Functions

### Array
  * **Array.first(array)** - Returns the first element in the array
  * **Array.last(array)** - Returns the last element in the array
  * **Array.validIndex(array, index)** - Returns true if the index is in limit
  * **Array.normalizeIndex(array, index)** - Mainly to convert a negative index to a valid index from the right. Returns normalized index if index is valid, else undefined
  * **Array.indexesOf(array, element)** - Get indexes of all occurrences of an element
  * **Array.swap(array, indexA, indexB)** - Swaps values at indexes A & B, returns true if successful
  * **Array.removeFrom(array, element, count)** - Removes count number of value from the specified index. Count must be greater than 0 and defaults to 1. Returns the removed values.
  * **Array.remove(array, element, count)** - Remove instances of a specific element from the array
  * **Array.insert(array, index, element1[...elementN])** - Inserts a set of elements at a position
  * **Array.append(array, array)** - Append an array to the end of current array
  * **Array.filterPush(array, val1, [val2...valN])** - Pushes only non-null values into the array
  * **Array.unique(array)** - Returns a new array of all unique elements
  * **Array.hashify(array, path)** - Converts an array into a hash with value at the specified path as key
  * **Array.findBy(array, path, value)** - Find first element from the array with matching value at the specified path. The function uses === for comparison
  * **Array.findAllBy(array, path, value)** - Finds all element from the array with matching value at the specified path. Uses === for comparison

### Object
  * **Object.typeOf(object)** - Returns correct type of object as a string. Fixes type for array, null, date, new Boolean, new Number, new String, RegExp, NaN & Infinity.
  * **Object.isObject(object)** - Returns true for non-null objects
  * **Object.isPlainObject(object)** - Returns true for a plain objects (non-null, not array, not dom element, not window, not any other basic types)
  * **Object.isArray(object)** - Returns true if object is an Array
  * **Object.isString(object)** -Returns true if object is a String
  * **Object.isBoolean(object)** - Returns true if object is a Boolean
  * **Object.isNumber(object)** - Returns true if object is a Number
  * **Object.isFunction(object)** - Returns true if object is a Function
  * **Object.val(path)** - Gets the value at the specified key path. Keys in the path must be dot separated
  * **Object.keys()** - Return all keys of current object
  * **Object.values()** - Return an array of all values in the object
  * **Object.keyOf(value)** - Given a value does a reverse look-up for a key
  * **Object.keysOf(value)** - Given a value does a reverse look-up for all matching keys
  * **Object.forEach(callback)** - Adds the missing forEach function to Objects
  * **Object.merge(object, appendArray)** - Recursively merges the given object to the current object
  * **Object.equals(objectA, objectB)** - Returns true if both objects have the same key-value pairs
  * **Object.inject(object, properties)** - Injects a set of non-enumerable properties into an object

### String
  * **String.format([val1, val2...Key Object])** - Replaces the patterns in current string with the given values. Pattern can be {} or {argumentIndex} or {keyName}. {} will be replaced in the order of given arguments. Optionally a hash of key value pairs can be passed as last argument.
  * **String.fmt([val1, val2...Key Object])** - Just an alias for format
  * **String.removeTags()** - Removes HTML tags from current string

## Running Tests
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
* **0.5.0**
  * Array - hashify, findBy, findAllBy
* **0.6.0**
  * Object - equals, inject
  * String - removeTags
* **0.7.0**
  * Major performance changes - All the functions were moved into custom namespaces
  * Backward compatibility is maintained