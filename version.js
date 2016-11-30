/*!
 * MolGL®
 * Scalable molecular visualisation with WebGL.
 * ___________________________________________________________________________
 *
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * Architectuur en Code handgemaakt door Prabhat Kumar.
 * @author    : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Sequømics Research [http://research.sequomics.com/].
 * @copyright : Sequømics Corporation [http://sequomics.com/].
 * ___________________________________________________________________________
 *
 * @date      : 18-Nov-2016
 * @license   : Apache, version 2.0
 * @require   : Node.js®
 * @require   : NPM
 * @require   : Git
 * @require   : package.json and bower.json
 * @build     : SEED™ — Umeå
 *              └────── A Sequømics Product — http://sequomics.com/.
 * ___________________________________________________________________________
 *
 * --/The Heart of Version-ing System/-- of "MolGL®".
 * ___________________________________________________________________________
 */

// Invoking strict mode.
///@purpose: Strict mode applies to entire scripts or to individual functions.
"use strict";

// To load required Node module.
///-----------------------------
var fs          = require('fs');
var path        = require('path');

// To load required NPM modules.
///-----------------------------
var chalk       = require('chalk');
var semver      = require('semver');

// Default color defined.
///----------------------
var noop        = chalk.red;
var yeep        = chalk.green;

// An object literals.
///-------------------
var build = {
  ///Nonidentifier property names are quoted.
  "system": "SEED™",
  "name": "Umeå",
  "audience": "for all scientist."
};

// A smart license function.
///-------------------------
var license = [
'/*!                                                                                                  ',
' * MolGL® — %(version)s                                                                              ',
' * Scalable molecular visualisation with WebGL.                                                      ',
' * ---------------------------------------------------------------------------                       ',
' * Copyright © 2008 - ' + new Date().getFullYear() + ', Prabhat Kumar, All rights reserved.          ',
' * ---------------------------------------------------------------------------                       ',
' * Copyright © 2014 - ' + new Date().getFullYear() + ', Sequømics Research, All rights reserved.     ',
' * Copyright © 2014 - ' + new Date().getFullYear() + ', Sequømics Corporation, All rights reserved.  ',
' * ---------------------------------------------------------------------------                       ',
' * HomePage: http://research.sequomics.com/ or http://sequomics.com/                                 ',
' * ---------------------------------------------------------------------------                       ',
' * Available via the Apache, version 2.0. [http://www.apache.org/licenses/]                          ',
' * See: https://github.com/MolGL/MolGL — for details.                                                ',
' * ---------------------------------------------------------------------------                       ',
' */                                                                                                  ',
'\n',
'/*!                                                                                                  ',
' * Build System — ' + build.system + ':' + build.name + ' — ' + '%(version)s' + ' — '+ build.audience ,
' * ---------------------------------------------------------------------------                       ',
' * Copyright © 2015 - ' + new Date().getFullYear() + ', Sequømics Corporation, All rights reserved.  ',
' * Available via the Apache, version 2.0. [http://www.apache.org/licenses/]                          ',
' * See: http://seed.sequomics.com/ — for details.                                                    ',
' * ---------------------------------------------------------------------------                       ',
' */                                                                                                  ',
'\n',
].map(function(s) {
  return s.replace(/\s+$/, '');
}).join("\n");

// A citation of MolGL®.
///---------------------
var cite = JSON.parse(fs.readFileSync('./citation.json', {
  encoding: "utf8"
}));

// To get asset(s) information.
///----------------------------
var bkg  = JSON.parse(fs.readFileSync('./bower.json', {
  encoding: "utf8"
}));

var pkg  = JSON.parse(fs.readFileSync('./package.json', {
  encoding: "utf8"
}));

// To get credential(s) information.
///---------------------------------
var ftp  = JSON.parse(fs.readFileSync('./secret.json', {
  encoding: "utf8"
}));

var aws  = JSON.parse(fs.readFileSync('./aws.json', {
  encoding: "utf8"
}));

// To sync NPM credential(s) information.
// Do not store credentials in the git repo,
// store them separately and read from a secret file.
///--------------------------------------------------
var npm  = JSON.parse(fs.readFileSync('./npm.json', {
  encoding: "utf8"
}));

// Global variables.
//=~~~~~~~~~~~~~~~~~
var rootPath    = './';
var corePath    = './core/';

// An object with no properties.
// -----------------------------
var replaceHandlers = {};

// A function to register `ReplaceHandler`.
///----------------------------------------
function registerReplaceHandler(keyword, handler) {
  replaceHandlers[keyword] = handler;
}

/*!
 * Replace %(id)s in strings with values in objects(s).
 * ----------------------------------------------------
 * Given a string like `"Hello %(name)s from %(user.country)s"`
 * and an object like `{name:"Prabhat", user:{country:"India"}}` would,
 * return `"Hello Prabhat from India"`.
 * ----------------------------------------------------
 * @param {string} str string to do replacements in,
 * @param {Object|Object[]} params one or more objects.
 * @returns {string} string with replaced parts.
 */
var replaceParams = (function() {
  
  var replaceParamsRE = /%\(([^\)]+)\)s/g;
  
  return function(str, params) {
    if (!params.length) {
      params = [params];
    }
    return str.replace(replaceParamsRE, function(match, key) {
      var colonNdx = key.indexOf(":");
      if (colonNdx >= 0) {
        try {
          var hanson = null;
          var args = hanson.parse("{" + key + "}");
          var handlerName = Object.keys(args)[0];
          var handler = replaceHandlers[handlerName];
          if (handler) {
            return handler(args[handlerName]);
          }
          console.error(noop("SEED™: Unknown substition handler: " + handlerName));
        } catch(e) {
          console.error(noop(e));
          console.error(noop("SEED™: Bad substitution: %(" + key + ")s"));
        }
      } else {
        // handle normal substitutions.
        var keys = key.split('.');
        for (var ii = 0; ii < params.length; ++ii) {
          var obj = params[ii];
          for (var jj = 0; jj < keys.length; ++jj) {
            key = keys[jj];
            obj = obj[key];
            if (obj === undefined) {
              break;
            }
          }
          if (obj !== undefined) {
            return obj;
          }
        }
      }
      console.error(noop("SEED™: Unknown key: " + key));
      return "%(" + key + ")s";
    });
  };
}());

// A function to register `hackForCommonJSAndBrowserify`.
// for [Require.js]
///------------------------------------------------------
function hackForCommonJSAndBrowserify(text, sourceMapText) {
  var dirname = path.dirname(this.outPath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  text = text.replace(/require/g, 'notrequirebecasebrowserifymessesup');
  fs.writeFileSync(this.outPath, text, {
    encoding: "utf-8"
  });
}
