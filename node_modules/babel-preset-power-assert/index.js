/**
 * babel-preset-power-assert
 *   Babel preset for all power-assert plugins
 * 
 * https://github.com/power-assert-js/babel-preset-power-assert
 *
 * Copyright (c) 2016-2018 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/power-assert-js/babel-preset-power-assert/blob/master/LICENSE
 */
'use strict';

module.exports = {
    plugins: [
        require('babel-plugin-empower-assert'),
        require('babel-plugin-espower/with-experimental-syntax')
    ]
};
