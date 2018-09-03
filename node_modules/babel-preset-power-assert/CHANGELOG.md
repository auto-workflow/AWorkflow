## [2.0.0](https://github.com/power-assert-js/babel-preset-power-assert/releases/tag/v2.0.0) (2018-01-18)


#### Features

* [Allow experimental syntax by default](https://github.com/power-assert-js/babel-preset-power-assert/pull/5) since most of babel users use experimental (not in ES-standard) syntax.


#### Breaking Changes

* Changing `embedAst` option's default to `true` does not break builds but may slow your build time down. If you are aware that you are not using experimental (not in ES-standard) syntax, please use babel-preset-power-assert 1.x for the former behavior.


## [1.0.0](https://github.com/power-assert-js/babel-preset-power-assert/releases/tag/v1.0.0) (2016-04-13)


The first release.
