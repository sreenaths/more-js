"use strict"

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.more = factory()
}(this, function () { 'use strict';
  return {
    Object: require('./types/object'),
    String: require('./types/string'),
    Array: require('./types/array'),
    Function: require('./types/function')
  };
}));