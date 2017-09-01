#!/usr/bin/env node
'use strict'

const chalk = require('chalk')
const figlet = require('figlet')

require('sywac')
  .preface(
    chalk.magenta(figlet.textSync('alain', 'Univers')),
    'Need a product name? Ask alain!'
  )
  .number('-e, --exactly <number>', { desc: 'Print exactly this many product names' })
  .number('-n, --min <number>', { desc: 'Print at least this many product names' })
  .number('-x, --max <number>', { desc: 'Print at most this many product names' })
  .number('-i, --interval <number>', {
    desc: 'How many milliseconds between names?',
    defaultValue: 1000
  })
  .boolean('-f, --forever', { desc: 'Print product names until you kill it' })
  .boolean('-m, --multline', { desc: 'Print each product name on its own line' })
  .boolean('-c, --colorless', { desc: 'Don\'t print colorful product names' })
  .boolean('-b, --brief', { desc: 'Names only (implies multline and colorless)' })
  .help('-h, --help')
  .version('-v, --version')
  .example('alain', { desc: 'Prints one product name and done' })
  .example('alain -e 10', { desc: 'Prints ten product names, one second apart' })
  .example('alain -n 5 -x 20 -i 2000', { desc: 'Prints between 5 and 20 product names, 2 seconds apart' })
  .example('alain -fm', { desc: 'Perpetually prints a new name on separate lines' })
  .style({
    usagePrefix: up => chalk.white('Usage:') + up.slice(6),
    group: heading => chalk.green(figlet.textSync(heading, 'Small Slant')),
    desc: d => chalk.white(d),
    hints: hint => hint.replace(/\[(.+?)\]/g, (m, x) => `[${chalk.yellow(x)}]`),
    messages: msg => chalk.red(figlet.textSync(msg, 'ANSI Shadow')),
    all: s => s.replace(/alain/g, chalk.magenta('alain'))
  })
  .outputSettings({ maxWidth: 90 })
  .parseAndExit()
  .then(argv => {
    const uniqueRandomArray = require('unique-random-array')
    const alain = require('./')
    const opts = { exactly: argv.exactly, min: argv.min, max: argv.max, object: true }
    const names = [].concat(alain.sync(opts))
    const color = uniqueRandomArray([ chalk.red, chalk.green, chalk.yellow, chalk.blue, chalk.magenta, chalk.cyan ])

    if (argv.b) {
      argv.multline = true
      argv.c = true
    }

    function stringFromObject (nameObj) {
      return argv.c ? nameObj.left + nameObj.right : color()(nameObj.left) + color()(nameObj.right)
    }

    function nextName () {
      setTimeout(() => {
        const name = argv.f ? alain.sync({ exactly: 1, object: true }) : names.shift()
        process.stdout.write((argv.multline ? '\n' : '') + stringFromObject(name))
        if (argv.f || names.length) {
          if (!argv.b) process.stdout.write('... ')
          nextName()
        } else {
          console.log()
        }
      }, argv.interval)
    }

    if (!argv.b) process.stdout.write('We\'ll call it... ')
    nextName()
  })
