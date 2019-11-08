/**
 * @fileoverview Requires test attributes on radios.
 * @author David Calhoun
 */
const {
    errors,
    defaultRuleSchema,
    defaults
} = require('../constants');

const {
    getError,
    shouldBypass
} = require('../utils');

module.exports = {
    meta: {
        docs: {
            description: 'Requires test attributes on MUI Radio.',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://github.com/joaosoumoreira/eslint-plugin-test-selectors/tree/master/docs/rules/radio.md'
        },
        fixable: null,
        schema: defaultRuleSchema
    },

    create: function (context) {
        const options = context.options[1] || {};
        const testAttribute = options.testAttribute || defaults.testAttribute;

        return {
            JSXOpeningElement: (node) => {
                const bypass = shouldBypass(node, options, [
                    {
                        attribute: 'inputProps',
                        test: ({ elementType }) => {
                            return elementType.toLowerCase() !== 'radio';
                        }
                    }
                ]);

                if (bypass) return;

                context.report({
                    node,
                    message: getError(errors.radio.message, testAttribute)
                });
            }
        };
    }
};
