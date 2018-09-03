## jsdoc-export-default-interop
[![npm](https://img.shields.io/npm/v/jsdoc-export-default-interop.svg?style=flat-square)](https://www.npmjs.com/package/jsdoc-export-default-interop)
[![Dependency Status](https://david-dm.org/nathanmarks/jsdoc-export-default-interop.svg?style=flat-square)](https://david-dm.org/nathanmarks/jsdoc-export-default-interop)

#### What is this?
A jsdoc plugin for changing exports behaviour so es6 default exports that are not interopable with commonjs module requires are properly documented

#### Installation

Install via NPM.

```bash
$ npm install jsdoc-export-default-interop --save-dev
```

Add plugin to jsdoc conf.json.

```json
{
    "tags": {
        "allowUnknownTags": true
    },
    "source": {
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": ["../node_modules/jsdoc-export-default-interop/dist/index"],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false,
        "default": {
            "outputSourceFiles": true
        }
    }
}
```

---

# API Reference

<a name="module_jsdoc-export-default-interop"></a>
## jsdoc-export-default-interop
A jsdoc plugin for changing exports behaviour
so es6 default exports that are not interopable
with commonjs module requires are properly documented


-----

<a name="exp_module_jsdoc-export-default-interop.astNodeVisitor"></a>
### jsdoc-export-default-interop ⏏ exports.astNodeVisitor : <code>Object</code>
The plugin object.

**Kind**: exports constant of <code>[jsdoc-export-default-interop](#module_jsdoc-export-default-interop)</code>
**See**: http://usejsdoc.org/about-plugins.html  

-----

