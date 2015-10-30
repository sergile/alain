var jsonfile = require('jsonfile')
var linebyline = require('linebyline')

var words = []

linebyline('./names.csv')
  .on('line', function (line) {
    if (!line) return

    var comma = line.indexOf(',')
    var option = comma === line.length - 1 ? null : line.substring(comma + 1)
    words.push({
      word: line.substring(0, comma),
      left: !option || parseInt(option, 10) === 0,
      right: !option || parseInt(option, 10) === 1
    })
  })
  .on('error', function (err) {
    console.error(err)
  })
  .on('close', function () {
    // console.dir(words)
    process.stdout.write('writing json file: ')
    jsonfile.writeFile('words.json', words, { spaces: 2 }, function (err) {
      if (err) process.stdout.write('error\n' + err)
      else process.stdout.write('✓')
      process.stdout.write('\n')
    })
  })
