#!/usr/bin/env node
const compileLib = require("../cjs/install/compileLib.js");
const {argv} = process;
compileLib.compileLib(argv);
