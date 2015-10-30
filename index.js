var uniqueRandomArray = require('unique-random-array')
var randomInt = require('random-int')
var Promise = require('es6-promise').Promise

var words = require('./words.json')
var leftWords = filterWords('left')
var rightWords = filterWords('right')
var randomLeft = uniqueRandomArray(leftWords)
var randomRight = uniqueRandomArray(rightWords)
var defaultOpts = { exactly: 1 }

module.exports = alain

function alain (opts, cb) {
  if (typeof opts === 'function') {
    var switchedOpts = cb
    cb = opts
    opts = switchedOpts || defaultOpts
  }

  // callback
  if (typeof cb === 'function') {
    // could use process.nextTick instead,
    // but setImmediate can be canceled via return value
    return setImmediate(function () {
      try {
        return cb(null, alain.sync(opts))
      } catch (err) {
        return cb(err)
      }
    })
  }

  // promise
  return new Promise(function (resolve, reject) {
    try {
      return resolve(alain.sync(opts))
    } catch (err) {
      return reject(err)
    }
  })
}

alain.sync = function (opts) {
  opts = opts || defaultOpts
  var exactly = parseInt(opts.exactly, 10)

  // return string by default
  if (exactly === 1) return randomName(opts.object)

  // use array, either exactly or b/w min and max
  var array
  if (exactly) {
    array = Array(exactly)
  } else if (opts.min || opts.max) {
    var min = opts.min || 1
    array = Array(randomInt(min, opts.max || min))
  } else {
    array = Array(1)
  }
  for (var i = 0; i < array.length; i++) {
    array[i] = randomName(opts.object)
  }
  if (opts.join) return array.join(opts.join)
  return array
}

alain.leftWords = function () {
  return leftWords
}

alain.rightWords = function () {
  return rightWords
}

function randomName (objWanted) {
  var left = randomLeft()
  var right = randomRight()
  return objWanted ? { left: left, right: right } : left + right
}

function filterWords (prop) {
  return words.filter(function (wordObj) {
    return wordObj[prop] === true
  }).map(function (wordObj) {
    return wordObj.word
  })
}
