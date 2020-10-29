const path = require("path");
const runner = require("sass-true");

const file = path.join(__dirname, "test__main.scss");

runner.runSass({ file }, { describe, it });
