#!/usr/bin/env node
const compileLib = require("../install/compileLib.js");
const {argv} = process;
compileLib.compileLib(argv);
