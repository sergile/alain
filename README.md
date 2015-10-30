# alain

> Need a product name? Ask alain!

![PumpkAlain](https://cloud.githubusercontent.com/assets/14964819/10855901/9b14b024-7f1a-11e5-8c20-4b994e4932fb.jpg "We'll call it...")

Coming up with good product names that are marketable, unique, and memorable is
hard. Let alain help!

Alain has already done the grunt work of figuring out which words make the best
product names and will generate a magical combination from this curated set...
every time, guaranteed!

What are you waiting for? Put alain to the test!

## Install

As CLI:

```
npm install -g alain
```

As module:

```
npm install --save alain
```

```js
var alain = require('alain')
```

## Examples

### Ask alain for a product name

```
alain
```

```
We'll call it... ProGear
```

### Ask for 5 product names

```
alain --exactly 5
```

```
We'll call it... NexSpin... TaxThink... WatchWeb... TeamSlick... WorkSat
```

### Let alain choose between 2 and 10 names

```
alain --min 2 --max 10
```

```
We'll call it... MapAlert... InstaFleet... PayTax... SafeAlert
```

### Have alain generate names until you find something specific you're looking for

Kill with Ctrl C

```
alain --forever --brief --interval 50 | grep Best
```

```
BestGear
DataBest
NexBest
```

### Get CLI help content

```
alain --help
```

## API

### alain([options], [callback(error, results)])
### alain.sync([options])

Generate product names.

The asynchronous version will call a given callback or, if not given, return a
[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

The synchronous version will return results immediately.

Each product name will be returned as either a string (default) or an object
(based on the `object` boolean option). If there are multiple generated names,
an array will be returned, unless the `join` string option is given, in which
case a string of joined names will be returned.

### options

Based on [random-words](https://www.npmjs.com/package/random-words).

- `exactly`: number

    Generate exactly this many product names.

- `min`: number

    Generate at least this many product names.

- `max`: number

    Generate at most this many product names.

- `join`: string

    Call join on the results array using this string.

- `object`: boolean

    Use an object for each result element instead of a string. The object will
    have a `left` property and `right` property as strings, representing the
    word combo that makes the name.

## License

ISC © Contributors

## Disclaimer

This module was created for fun but should definitely be taken seriously. ✌
