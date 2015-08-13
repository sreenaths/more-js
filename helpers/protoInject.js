"use strict"

module.exports = function (target, items) {
  target = target.prototype;

  Object.keys(items).forEach(function (key) {
    items[key]._old_ = items[key]._old_ || target[key],
    target[key] = items[key];
  });
};