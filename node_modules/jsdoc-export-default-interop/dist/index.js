'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlers = exports.astNodeVisitor = undefined;

var _syntax = require('jsdoc/src/syntax');

var _astnode = require('jsdoc/src/astnode');

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A jsdoc plugin for changing exports behaviour
 * so es6 default exports that are not interopable
 * with commonjs module requires are properly documented
 *
 * @module jsdoc-export-default-interop
 */

/**
 * The plugin object.
 *
 * @see http://usejsdoc.org/about-plugins.html
 * @type {Object}
 */
var astNodeVisitor = exports.astNodeVisitor = {

  /**
   * Tracks orphaned exports
   *
   * @private
   * @type {Array}
   */
  orphanStack: {},

  /**
   * Processes nodes as jsdoc walks the syntax tree
   * and sets default exports to named declarations.
   *
   * This is to create es5 compatible docs when using
   * an es6 transpiler such as babel 6 without exporting
   * defaults in a format that is interopable with commonjs requires
   *
   * @static
   * @param  {astNode} node JavaScript objects that use the format defined by the Mozilla Parser API
   * @param  {Object}  e    jsdoc event object
   */
  visitNode: function visitNode(node, e) {
    var _this = this;

    if (node.type === _syntax.Syntax.Program && node.sourceType === 'module' && node.body) {
      this.orphanStack = {};
      node.body.forEach(function (childNode) {
        if (isOrphanedExport.call(childNode)) {
          childNode.specifiers.forEach(function (specifier) {
            var localName = (0, _get3.default)(specifier, 'local.name', null);
            if (localName) {
              _this.orphanStack[localName] = childNode;
            }
          });
        }
      });
    } else if (e.code && e.code.name && this.orphanStack[e.code.name]) {
      e.code.name = 'exports.' + e.code.name;
    } else if (node.type === _syntax.Syntax.ExportDefaultDeclaration) {
      setNodeToNamedExport.call(node, e);
    } else if (isType.call(node, _syntax.Syntax.ExportNamedDeclaration) && isType.call(node.declaration, _syntax.Syntax.ClassDeclaration)) {
      transformClassExport.call(node, e);
    }
  }
};

var handlers = exports.handlers = {
  beforeParse: function beforeParse(e) {
    e.source = e.source.replace(/(.*\/\*\*\n.*\n.*\/\n)\s*export\s+default\s+class\s+([a-zA-Z0-9]*)\s+{/gm, 'export default $2;\n\n$1class $2 {');
  }
};

function setNodeToNamedExport(e) {
  var name = arguments.length <= 1 || arguments[1] === undefined ? 'default' : arguments[1];

  e.astnode.type = _syntax.Syntax.ExportNamedDeclaration;
  e.code = (0, _astnode.getInfo)(e.astnode);
  e.code.name = 'exports.' + name;
}

function transformClassExport(e) {
  var classInfo = (0, _astnode.getInfo)(this.declaration);
  setNodeToNamedExport.call(this, e, classInfo.name);
}

function isOrphanedExport() {
  return this.type === _syntax.Syntax.ExportNamedDeclaration && !this.declaration && this.specifiers;
}

function isType(type) {
  if (!this) {
    return false;
  }

  return this.type === type;
}