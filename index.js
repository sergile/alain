'use strict'

const uniqueRandomArray = require('unique-random-array')
const randomInt = require('random-int')

const words = require('./words.json')
const leftWords = filterWords('left')
const rightWords = filterWords('right')
const randomLeft = uniqueRandomArray(leftWords)
const randomRight = uniqueRandomArray(rightWords)
const defaultOpts = { exactly: 1 }

module.exports = alain

function alain (opts, cb) {
  if (typeof opts === 'function') {
    const switchedOpts = cb
    cb = opts
    opts = switchedOpts || defaultOpts
  }

  // callback
  if (typeof cb === 'function') {
    // could use process.nextTick instead,
    // but setImmediate can be canceled via return value
    return setImmediate(() => {
      try {
        return cb(null, alain.sync(opts))
      } catch (err) {
        return cb(err)
      }
    })
  }

  // promise
  return new Promise((resolve, reject) => {
    try {
      return resolve(alain.sync(opts))
    } catch (err) {
      return reject(err)
    }
  })
}

alain.sync = opts => {
  opts = opts || defaultOpts
  const exactly = parseInt(opts.exactly, 10)

  // return string by default
  if (exactly === 1) return randomName(opts.object)

  // use array, either exactly or b/w min and max
  let array
  if (exactly) {
    array = Array(exactly)
  } else if (opts.min || opts.max) {
    const min = opts.min || 1
    array = Array(randomInt(min, opts.max || min))
  } else {
    array = Array(1)
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = randomName(opts.object)
  }
  if (opts.join) return array.join(opts.join)
  return array
}

alain.leftWords = () => {
  return leftWords
}

alain.rightWords = () => {
  return rightWords
}

function randomName (objWanted) {
  const left = randomLeft()
  const right = randomRight()
  return objWanted ? { left: left, right: right } : left + right
}

function filterWords (prop) {
  return words.filter(wordObj => wordObj[prop] === true).map(wordObj => wordObj.word)
}
