const fs = require("fs");
const { minify } = require("terser");

const file = fs.readFileSync("./main.js", "utf-8");

const LOAD_SCRIPT_REGEX = /function loadScript[\s\S]+?\n}/;
const SCRIPTS_TO_LOAD_REGEX = /const scriptsToLoad.+\n([\s\S]*?)];/;
const STRIP_END_REGEX = /console.log\(.+Starting to load scripts[\s\S]+/;
const SCRIPT_NAME_REGEX = /\s*['"](.+)['"].*\s*/;

const loadFiles = file.match(SCRIPTS_TO_LOAD_REGEX)[1].split("\n")
    .map(t => t.match(SCRIPT_NAME_REGEX)?.[1])
    .filter(Boolean);

const transformed = 
`${loadFiles.map(f => `/* ${f} */\n${fs.readFileSync("./" + f, "utf-8")}`).join("\n\n")}
/* MAIN FILE */
${file.replace(LOAD_SCRIPT_REGEX, "").replace(SCRIPTS_TO_LOAD_REGEX, "").replace(STRIP_END_REGEX, "")}
initializeBlueMapExternalExtender();`

minify(transformed, { mangle: true, toplevel: true })
    .then(minified => fs.writeFileSync("./extender.js", minified.code));
