/* eslint-disable no-console */

const chalk = require('chalk');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: err => {
    console.error(chalk.red(err));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port) => {
    console.log(`Server started ${chalk.green('✓')}`);

    console.log(`
${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://localhost:${port}`)}
      \n  ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}`);
  }
};

module.exports = logger;
