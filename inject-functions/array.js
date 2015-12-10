"use strict"

var Array = require('../types/array');

/*
 * Opting for manual linking for better performance
 */
module.exports = {
  first: function () {
    return Array.first(this);
  },
  last: function () {
    return Array.last(this);
  },

  validIndex: function (index) {
    return Array.validIndex(this, index);
  },
  normalizeIndex: function (index, length) {
    return Array.normalizeIndex(this, index, length);
  },
  indexesOf: function (element) {
    return Array.indexesOf(this, element);
  },

  swap: function (indexA, indexB) {
    return Array.swap(this, indexA, indexB);
  },

  removeFrom: function (index, count) {
    return Array.removeFrom(this, index, count);
  },
  remove: function (element, count) {
    return Array.remove(this, element, count);
  },

  insert: function () {
    return Array.insert.apply(this, Array.append([this], arguments));
  },
  append: function (arrayToAppend) {
    return Array.append(this, arrayToAppend);
  },
  filterPush: function () {
    return Array.filterPush.apply(this, Array.append([this], arguments));
  },

  unique: function () {
    return Array.unique(this);
  },

  realValues: function () {
    return Array.realValues(this);
  },

  merge: function (sourceArray, append) {
    return Array.merge(this, sourceArray, append);
  },

  hashify: function (path) {
    return Array.hashify(this, path);
  },

  findBy: function (path, value) {
    return Array.findBy(this, path, value);
  },
  findAllBy: function (path, value) {
    return Array.findAllBy(this, path, value);
  }
};