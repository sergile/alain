#!/usr/bin/env node

var yargonaut = require('yargonaut')
var yargs = require('yargs')
var figlet = yargonaut.figlet()
var chalk = yargonaut.chalk()

yargonaut
  .help('Small Slant').errors('ANSI Shadow')
  .style('yellow').helpStyle('green').errorsStyle('red')

var argv = yargs
  .usage(
    chalk.magenta(figlet.textSync('alain', 'Univers')) +
    '\nNeed a product name? Ask ' + chalk.magenta('alain') + '!\n' +
    '\nUsage: alain [options]'
  )
  .option('e', {
    alias: 'exactly',
    describe: 'Print exactly this many product names'
  })
  .option('n', {
    alias: 'min',
    describe: 'Print at least this many product names'
  })
  .option('x', {
    alias: 'max',
    describe: 'Print at most this many product names'
  })
  .option('i', {
    alias: 'interval',
    describe: 'How many milliseconds between names?',
    default: 1000
  })
  .option('f', {
    alias: 'forever',
    describe: 'Print product names until you kill it',
    type: 'boolean'
  })
  .option('m', {
    alias: 'multline',
    describe: 'Print each product name on its own line',
    type: 'boolean'
  })
  .option('c', {
    alias: 'colorless',
    describe: 'Don\'t print colorful product names',
    type: 'boolean'
  })
  .option('b', {
    alias: 'brief',
    describe: 'Names only (implies multline and colorless)',
    type: 'boolean'
  })
  .help('h').alias('h', 'help')
  .version(require('./package.json').version, 'v').alias('v', 'version')
  .example('alain', 'Prints one product name and done')
  .example('alain -e 10', 'Prints ten product names, one second apart')
  .example('alain -n5 -x20 -i2000', 'Prints between 5 and 20 product names, 2 seconds apart')
  .example('alain -fm', 'Perpetually prints a new name on separate lines')
  .argv

var uniqueRandomArray = require('unique-random-array')
var alain = require('./')
var opts = { exactly: argv.exactly, min: argv.min, max: argv.max, object: true }
var names = [].concat(alain.sync(opts))
var color = uniqueRandomArray([ chalk.red, chalk.green, chalk.yellow, chalk.blue, chalk.magenta, chalk.cyan ])

if (argv.b) {
  argv.multline = true
  argv.c = true
}

function stringFromObject (nameObj) {
  return argv.c ? nameObj.left + nameObj.right : color()(nameObj.left) + color()(nameObj.right)
}

function nextName () {
  setTimeout(function () {
    var name = argv.f ? alain.sync({ exactly: 1, object: true }) : names.shift()
    process.stdout.write((argv.multline ? '\n' : '') + stringFromObject(name))
    if (argv.f || names.length) {
      if (!argv.b) process.stdout.write('... ')
      nextName()
    }
    else console.log()
  }, argv.interval)
}

if (!argv.b) process.stdout.write('We\'ll call it... ')
nextName()
