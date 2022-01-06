import Path from "path";
import Module from "module";
/*** *Current Working Directory* */
const CWD = Path.dirname(import.meta.url.replace("file" + ":" + "/", ""));
/***
 *  JSON Capable Importer
 *
 *  @type {NodeRequire}
 *
 */
const Import = Module.createRequire(CWD);
const Package = Import("../../package.json");
// Package Version
const Version = ["version", JSON.stringify(Package.version, null, 4) + "\n"];
export { Version };
export default Version;
