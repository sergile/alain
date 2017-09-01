'use strict'

const jsonfile = require('jsonfile')
const linebyline = require('linebyline')

const words = []

linebyline('./names.csv')
  .on('line', line => {
    if (!line) return

    const comma = line.indexOf(',')
    const option = comma === line.length - 1 ? null : line.substring(comma + 1)
    words.push({
      word: line.substring(0, comma),
      left: !option || parseInt(option, 10) === 0,
      right: !option || parseInt(option, 10) === 1
    })
  })
  .on('error', err => {
    console.error(err)
  })
  .on('close', () => {
    const numLeft = words.filter(w => { return w.left }).length
    const numRight = words.filter(w => { return w.right }).length
    console.log('%d left words x %d right words = %d total product names', numLeft, numRight, numLeft * numRight)
    process.stdout.write('writing json file: ')
    jsonfile.writeFile('words.json', words, { spaces: 2 }, err => {
      if (err) process.stdout.write('error\n' + err)
      else process.stdout.write('✓')
      process.stdout.write('\n')
    })
  })
