import Test from 'blue-tape';
import Jsdoc from 'jsdoc-api';
import _find from 'lodash/find';

// import Jedi from '../lib';

Test('Parsing exports', t => {

  return Jsdoc.explain({
      files: 'test/code/exports.js',
      configure: 'docs/conf.json'
    })
    .then(doclets => {
      doclets.map(doclet => {
        console.log(!doclet.undocumented && doclet);
      });

      t.ok(_find(doclets, {
        kind: 'module',
        name: 'my-lib',
        longname: 'module:my-lib'
      }), 'has the core module doclet');

      t.ok(_find(doclets, {
        kind: 'constant',
        name: 'libObject',
        longname: 'module:my-lib.libObject'
      }), 'should export as expected');

      t.ok(_find(doclets, {
        kind: 'function',
        name: 'fighter',
        longname: 'module:my-lib.fighter'
      }), 'should export as expected');

      t.ok(_find(doclets, {
        kind: 'function',
        name: 'helper',
        longname: 'module:my-lib.helper'
      }), 'should export as expected');

      t.ok(_find(doclets, {
        kind: 'class',
        name: 'App',
        longname: 'module:my-lib.App'
      }), 'should export a class');
    });
});
