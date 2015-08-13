"use strict"

module.exports = function (target, items) {
  Object.keys(items).forEach(function (key) {
    if(target[key]) {
      items[key]._old_ = target[key]._old_ || target[key];
    }
    Object.defineProperty(target, key, {
      value: items[key]
    });
  });
};