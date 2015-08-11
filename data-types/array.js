"use strict"

require("../helpers/protoInject")(Array, {

  /*
   * Append an array to the end of current array.
   * @params array {Array}
   * @return Current array
   */
  append: function (array) {
    this.push.apply(this, array);
    return this;
  }

});