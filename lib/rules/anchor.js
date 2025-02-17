/**
 * @fileoverview Requires test attributes on anchors.
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
            description: 'Requires test attributes on anchors.',
            category: 'Possible Errors',
            recommended: true,
            url: 'https://github.com/JoaoSouMoreira/eslint-plugin-test-selectors/tree/master/docs/rules/anchor.md'
        },
        fixable: null,
        schema: defaultRuleSchema
    },

    create: function(context) {
        const options = context.options[1] || {};
        const testAttribute = options.testAttribute || defaults.testAttribute;

        return {
            JSXOpeningElement: (node) => {
                const bypass = shouldBypass(node, context, [
                    {
                        attribute: 'href',
                        test: ({ attributeValue, elementType }) => {
                            const hasHref = typeof attributeValue === 'string';
                            const isAnchor = elementType === 'a';
                            return !isAnchor || (isAnchor && hasHref);
                        }
                    }
                ]);

                if (bypass) return;

                context.report({
                    node,
                    message: getError(errors.anchor.message, testAttribute)
                });
            }
        };
    }
};
