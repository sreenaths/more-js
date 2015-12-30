"use strict"

var MoreString = {
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
        key,
        i, blankPatternCount, partCount,
        argLength, paramObject;

    arguments = finalString.slice.call(arguments);
    arguments.shift();

    argLength = arguments.length,
    paramObject = arguments[argLength - 1];

    if(stringParts.length > 2) {
      if(typeof paramObject !== "object") paramObject = {};

      for(i = 0, blankPatternCount = 0, partCount = stringParts.length - 1; i < partCount; i++) {
        finalString.push(stringParts[i]);
        if(key = stringParts[++i]) {
          finalString.push(paramObject[key] || arguments[key] || '');
        }
        else if(blankPatternCount < argLength){
          finalString.push(arguments[blankPatternCount]);
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

module.exports = MoreString;