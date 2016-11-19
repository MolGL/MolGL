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
