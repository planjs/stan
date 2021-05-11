const { CLIEngine } = require('eslint');

const cli = new CLIEngine({});

module.exports = {
  '*.{js,ts,tsx,jsx}': (files) => {
    const f = files.filter((file) => !cli.isPathIgnored(file)).join(' ');
    return [`eslint --fix ${f}`, `git add ${f}`];
  },
  'package.json': 'sort-package-json',
  '*.{json,json,css,scss,less}': ['prettier --write', 'git add -f'],
};
