import { Syntax } from 'jsdoc/src/syntax';
import { getInfo } from 'jsdoc/src/astnode';
import _get from 'lodash/get';

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
export const astNodeVisitor = {

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
  visitNode (node, e) {
    if (node.type === Syntax.Program && node.sourceType === 'module' && node.body) {
      this.orphanStack = {};
      node.body.forEach(childNode => {
        if (isOrphanedExport.call(childNode)) {
          childNode.specifiers.forEach(specifier => {
            const localName = _get(specifier, 'local.name', null);
            if (localName) {
              this.orphanStack[localName] = childNode;
            }
          });
        }
      });
    } else if (e.code && e.code.name && this.orphanStack[e.code.name]) {
      e.code.name = `exports.${e.code.name}`;
    } else if (node.type === Syntax.ExportDefaultDeclaration) {
      setNodeToNamedExport.call(node, e);
    } else if (isType.call(node, Syntax.ExportNamedDeclaration) && isType.call(node.declaration, Syntax.ClassDeclaration)) {
      transformClassExport.call(node, e);
    }
  }

};

export const handlers = {

  beforeParse (e) {
    e.source = e.source.replace(
      /(.*\/\*\*\n.*\n.*\/\n)\s*export\s+default\s+class\s+([a-zA-Z0-9]*)\s+{/gm,
      'export default $2;\n\n$1class $2 {'
    );
  }

};

function setNodeToNamedExport (e, name = 'default') {
  e.astnode.type = Syntax.ExportNamedDeclaration;
  e.code = getInfo(e.astnode);
  e.code.name = `exports.${name}`;
}

function transformClassExport (e) {
  const classInfo = getInfo(this.declaration);
  setNodeToNamedExport.call(this, e, classInfo.name);
}

function isOrphanedExport () {
  return this.type === Syntax.ExportNamedDeclaration && !this.declaration && this.specifiers;
}

function isType (type) {
  if (!this) {
    return false;
  }

  return this.type === type;
}
