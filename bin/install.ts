#!/usr/bin/env node
import * as compileLib from "../src/install/compileLib";
const {argv} = process;
compileLib.compileLib(argv);
