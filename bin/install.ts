#!/usr/bin/env node
import * as compileLib from "../install/compileLib";
const {argv} = process;
compileLib.compileLib(argv);
