#!/usr/bin/env node
import { compileLib } from "../src/install/compileLib";
const {argv} = process;
compileLib(argv);
