# @funeralguide/eslint-plugin-test-selectors
[![Build Status](https://travis-ci.org/JoaoSouMoreira/@funeralguide/eslint-plugin-test-selectors.svg?branch=master)](https://travis-ci.org/JoaoSouMoreira/@funeralguide/test-selectors)
[![Downloads][downloads-image]][npm-url]

Enforces that a `data-test-id` attribute is present on interactive DOM elements to help with UI testing.

* ❌ `<button>Download</button>`
* ✅ `<button data-test-id="download-button">Download</button>`

### Example of @funeralguide/eslint-plugin-test-selectors running in Visual Studio Code:
![Example of @funeralguide/eslint-plugin-test-selectors running in Visual Studio Code](https://github.com/JoaoSouMoreira/@funeralguide/test-selectors/blob/master/vscode-test-selectors-example.png)

## Changelog
* `1.0.0` - initial release

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@funeralguide/eslint-plugin-test-selectors`:

```
$ npm install @funeralguide/eslint-plugin-test-selectors --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@funeralguide/eslint-plugin-test-selectors` globally.

## Usage

Add `@funeralguide/test-selectors` to the plugins section of your `.eslintrc` configuration fil:

```json
{
    "plugins": [
        "@funeralguide/test-selectors"
    ]
}
```

If you want to use all the recommended default rules, you can simply add this line to the `extends` section of your `.eslintrc` configuration:

```json
{
    "extends": [
        "plugin:@funeralguide/test-selectors/recommended"
    ]
}
```

By default, this will run all [Supported Rules](#supported-rules) and emit eslint warnings.  If you want to be more strict, you can emit eslint errors by instead using `plugin:@funeralguide/test-selectors/recommendedWithErrors`.

Another option: you can also selectively enable and disable individual rules in the `rules` section of your `.eslintrc` configuration.  For instance, if you only want to enable the `@funeralguide/test-selectors/button` rule, skip the `extends` addition above and simply add the following to the `rules` section of your `.eslintrc` configuration:

```json
{
    "rules": {
        "@funeralguide/test-selectors/button": ["warn", "always"]
    }
}
```

If you like most of the recommended rules by adding the `extends` option above, but find one in particular to be bothersome, you can simply disable it:

```json
{
    "rules": {
        "@funeralguide/test-selectors/anchor": "off"
    }
}
```

Note: see [Supported Rules](#supported-rules) below for a full list.

## Custom rule options
All tests can be customized individually by passing an object with one or more of the following properties.

### testAttribute

The default test attribute expected is `data-test-id`, but you can override it with whatever you like.  Here is how you would use `data-some-custom-attribute` instead:

```json
{
    "rules": {
        "@funeralguide/test-selectors/onChange": ["warn", "always", { "testAttribute": "data-some-custom-attribute" }]
    }
}
```

### ignoreDisabled
By default all elements with the `disabled` attribute are ignored, e.g. `<input disabled />`.  If you don't want to ignore this attribute, set `ignoreDisabled` to `false`:

```json
{
    "rules": {
        "@funeralguide/test-selectors/onChange": ["warn", "always", { "ignoreDisabled": false }]
    }
}
```

### ignoreReadonly
By default all elements with the `readonly` attribute are ignored, e.g. `<input readonly />`.  If you don't want to ignore this attribute, set `ignoreReadonly` to `false`:

```json
{
    "rules": {
        "@funeralguide/test-selectors/onChange": ["warn", "always", { "ignoreReadonly": false }]
    }
}
```

### htmlOnly
Only supported on `button` rule, this option will exempt React components called Button from the rule.

```json
{
    "rules": {
        "@funeralguide/test-selectors/button": ["warn", "always", {"htmlOnly": true}]
    }
}
```

## Custom settings
There are a few settings that you can set

### ignoreFileName
By default all files will be checked for the rules. However, you can specify a filename as a string to tell ESLint to not check the rules against.
```json
{
    "settings": {
        "@funeralguide/test-selectors": {
            "ignoreFileName": "index.jsx"
        }
    }
}
```

## Supported Rules

* `@funeralguide/test-selectors/anchor`
* `@funeralguide/test-selectors/button`
* `@funeralguide/test-selectors/input`
* `@funeralguide/test-selectors/onChange`
* `@funeralguide/test-selectors/onClick`
* `@funeralguide/test-selectors/onKeyDown`
* `@funeralguide/test-selectors/onKeyUp`

## Further Reading

If you don't want these test attributes added in production, you can use something like [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)

Why `data` attributes and not `id` or `class`?  Check out some of the following:

* [Decoupling CSS Selectors From Your Tests](https://mixandgo.com/learn/decoupling-css-selectors-from-your-tests)
* [Test your DOM with Data Attributes](https://medium.com/@colecodes/test-your-dom-with-data-attributes-44fccc43ed4b)
* [Something Better than IDs for Identifying Elements in Selenium Tests](https://techblog.constantcontact.com/software-development/a-better-way-to-id-elements-in-selenium-tests/)
