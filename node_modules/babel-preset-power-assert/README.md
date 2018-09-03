[![power-assert][power-assert-banner]][power-assert-url]

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]


`babel-preset-power-assert` is a [Babel](https://babeljs.io/) preset for all [power-assert](https://github.com/power-assert-js/power-assert) plugins.


`babel-preset-power-assert` contains plugins below

- [babel-plugin-empower-assert](https://github.com/power-assert-js/babel-plugin-empower-assert): Babel plugin to convert assert to power-assert at compile time
- [babel-plugin-espower](https://github.com/power-assert-js/babel-plugin-espower): Babel plugin for power-assert


INSTALL
---------------------------------------

```
$ npm install --save-dev babel-preset-power-assert power-assert
```


HOW TO USE
---------------------------------------

### via [.babelrc](http://babeljs.io/docs/usage/babelrc/) (Recommended)

```javascript
{
  "presets": [
    "power-assert"
  ]
}
```

### via [Babel CLI](http://babeljs.io/docs/usage/cli/)

```
$ babel --presets power-assert /path/to/src/target.js > /path/to/build/target.js
```

### via [Babel API](http://babeljs.io/docs/usage/api/)

```javascript
var babel = require('babel-core');
var jsCode = fs.readFileSync('/path/to/src/target.js');
var transformed = babel.transform(jsCode, {
    presets: ['power-assert']
});
console.log(transformed.code);
```


AUTHOR
---------------------------------------
* [Takuto Wada](https://github.com/twada)


LICENSE
---------------------------------------
Licensed under the [MIT](https://github.com/power-assert-js/babel-preset-power-assert/blob/master/LICENSE) license.


[power-assert-url]: https://github.com/power-assert-js/power-assert
[power-assert-banner]: https://raw.githubusercontent.com/power-assert-js/power-assert-js-logo/master/banner/banner-official-fullcolor.png

[travis-url]: https://travis-ci.org/power-assert-js/babel-preset-power-assert
[travis-image]: https://secure.travis-ci.org/power-assert-js/babel-preset-power-assert.svg?branch=master

[npm-url]: https://npmjs.org/package/babel-preset-power-assert
[npm-image]: https://badge.fury.io/js/babel-preset-power-assert.svg

[license-url]: https://github.com/power-assert-js/babel-preset-power-assert/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg
