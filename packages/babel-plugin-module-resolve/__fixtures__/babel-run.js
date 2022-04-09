const path = require('path');
const fs = require('fs');
const register = require('@babel/register');

const fixtures = fs
  .readdirSync(path.join(__dirname))
  .filter((v) => fs.statSync(path.join(__dirname, v)).isDirectory());

module.exports = run;

function run(fixture) {
  const cwd = path.join(__dirname, fixture);
  const config = require(path.join(cwd, 'babel.config.js'));
  register({
    ...config,
    extensions: ['.js', '.ts'],
    cwd,
  });
  return require(path.join(cwd, 'src')).default;
}

const fixture = process.argv[2];
if (fixture) {
  if (fixtures.includes(fixture)) {
    console.log(run(fixture));
  } else {
    console.log(`only support: ${fixtures}`);
  }
}
