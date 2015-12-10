"use strict"

var String = require('../types/string'),
    Array = require('../types/array');

/*
 * Opting for manual linking for better performance
 */
module.exports = {
  fmt: function () {
    return String.fmt.apply(this, Array.append([this], arguments));
  },
  format: function () {
    return String.fmt.apply(this, Array.append([this], arguments));
  },
  removeTags: function () {
    return String.removeTags(this);
  }
};
