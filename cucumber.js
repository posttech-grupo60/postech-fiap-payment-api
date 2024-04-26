let common = [
    './test/features/**/*.feature',
    '--require-module ts-node/register', //typescript cucumber
    '--require ./test/stepDefinitions/**/*.ts',
    '--format progress-bar',
    `--format-options '{"snippetInterface": "synchronous"}'`
  ].join(' ');

module.exports = {
    default: common
}