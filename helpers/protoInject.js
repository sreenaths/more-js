"use strict"

module.exports = function (target, items) {
  target = target.prototype;

  Object.keys(items).forEach(function (key) {
    items[key]._ = target[key],
    target[key] = items[key];
  });
};