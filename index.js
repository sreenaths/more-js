"use strict"

var MoreObject = require('./types/object');

MoreObject.inject(Array.prototype, require('./inject-functions/array'));
MoreObject.inject(Object.prototype, require('./inject-functions/object'));
MoreObject.inject(Object, require('./inject-functions/object-static'));
MoreObject.inject(String.prototype, require('./inject-functions/string'));