"use strict"

require("../helpers/inject")(String.prototype, {

  /*
   * Replaces the patterns in current string with the given values.
   * Pattern can be {} or {argumentIndex} or {keyName}. {} will be replaced in the order of arguments.
   * Optionally a hash of key value pairs can be passed as last argument.
   * @params [val1, val2 ... Key Object]
   * @return formatted string
   */
  fmt: function () {
    var stringParts = this.split(/{(.*?)}/),
        finalString = [],
        key,
        i, blankPatternCount, partCount,
        paramObject = arguments[arguments.length - 1];

    if(stringParts.length > 2) {
      if(typeof paramObject !== "object") paramObject = {};

      for(i = 0, blankPatternCount = 0, partCount = stringParts.length - 1; i < partCount; i++) {
        finalString.push(stringParts[i]);
        if(key = stringParts[++i]) {
          finalString.push(paramObject[key] || arguments[key] || '');
        }
        else if(blankPatternCount < arguments.length){
          finalString.push(arguments[blankPatternCount]);
          blankPatternCount++;
        }
      }
      finalString.push(stringParts[partCount]);

      return finalString.join('');
    }

    return this;
  }

});