const {
    elementType,
    getProp,
    getPropValue,
} = require('jsx-ast-utils');

const {
    defaults
} = require('./constants');

// Hacky use of the Function constructor here, not sure there's a better way, other than using
// regex.
// https://stackoverflow.com/a/37217166/214017
const fillTemplate = (str, vars) => {
    return new Function(`return \`${ str }\`;`).call(vars);
};

/* Determines the value of an HTML Node prop/attribute. */
const getValue = (node, prop) => getPropValue(getProp(node.attributes, prop));

/* Determines if a node's attribute passes a filter test. */
const attributeTest = (node, { attribute, test }) => {
    const attributeValue = getValue(node, attribute);
    const type = elementType(node);
    // const parentType = node.parent.type === 'JSXElement' ? elementType(node.parent) : null;
    return test({ attributeValue, elementType: type });
};

module.exports = {
    /* Tagged template helper for error strings with custom attribute passed in. */
    getError: (errorString, attribute) => fillTemplate(errorString, { attribute }),

    /* Determines if a particular eslint rule should not apply to a DOM not. */
    shouldBypass: (node, context, rawTests) => {
        const options = context.options[1] || {};
        const tests = [ ...rawTests ];
        const filename = context.getFilename();

        // Ignore elements with a `disabled` attribute.
        const shouldIgnoreDisabled = (typeof options.ignoreDisabled === 'boolean' && options.ignoreDisabled) ||
            (typeof options.ignoreDisabled === 'undefined' && defaults.ignoreDisabled);
        if (shouldIgnoreDisabled) {
            tests.unshift({
                attribute: 'disabled',
                test: ({ attributeValue }) => typeof attributeValue === 'boolean' && attributeValue
            });
        }

        // Ignore elements with a `readonly` attribute.
        const shouldIgnoreReadonly = (typeof options.ignoreReadonly === 'boolean' && options.ignoreReadonly) ||
            (typeof options.ignoreReadonly === 'undefined' && defaults.ignoreReadonly);
        if (shouldIgnoreReadonly) {
            tests.unshift({
                attribute: 'readonly',
                test: ({ attributeValue }) => typeof attributeValue === 'boolean' && attributeValue
            });
        }

        // Ignore specific file name
        const settings = context.settings['test-selectors'] || {};
        const ignoreFileName = settings.ignoreFileName;
        if (ignoreFileName) {
            const paths = filename.split('/');
            const fileWithExtension = paths[paths.length - 1];
            tests.unshift({
                test: () => ignoreFileName === fileWithExtension
            });
        }


        const testAttribute = options.testAttribute || defaults.testAttribute;

        // Ignore elements with InputProps that have the test selector
        tests.unshift({
            attribute: 'InputProps',
            test: ({ attributeValue }) => typeof attributeValue === 'object'
            && attributeValue.inputProps
            && attributeValue.inputProps[testAttribute]
        });

        // Ignore elements with inputProps that have the test selector
        tests.unshift({
            attribute: 'inputProps',
            test: ({ attributeValue }) => typeof attributeValue === 'object' && attributeValue[testAttribute]
        });

        // Generic helper method to check for the presence of the data attribute.  All prior tests
        // act as a sieve, so this should be added (pushed) to the very end.
        tests.push({
            attribute: testAttribute,
            test: ({ attributeValue }) => {
                return typeof attributeValue !== 'undefined' &&
                    typeof attributeValue !== 'boolean' &&
                    attributeValue !== null;
            }
        });

        return tests.some(attributeTest.bind(null, node));
    }
};
