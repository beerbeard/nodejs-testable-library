// More info: https://github.com/standard-things/esm
// Set options as a parameter, environment variable, or rc file.

/* eslint no-global-assign: "error" */
/* globals require: true */
require = require("esm")(module/*, options*/)
module.exports = require("./index.js")