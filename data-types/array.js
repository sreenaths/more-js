"use strict"

require("../helpers/inject")(Array.prototype, {

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
  }

});