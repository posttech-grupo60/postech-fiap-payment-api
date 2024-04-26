"use strict";
// cucumber.ts
require('ts-node/register/transpile-only');
const path = require('path');
module.exports = {
    default: `--require ${path.join(__dirname, 'test/step_definitions/*.ts')}`
};
//# sourceMappingURL=cucumber.js.map