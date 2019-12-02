/**
 * @fileoverview Makes sure test attributes (e.g. data-test-id) are added to interactive DOM elements.
 * @author David Calhoun
 */
"use strict";

const requireIndex = require("requireindex");

module.exports = {
    rules: requireIndex(`${ __dirname }/rules`),
    configs: {
        recommended: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                '@funeralguide/test-selectors/anchor': 'warn',
                '@funeralguide/test-selectors/button': 'warn',
                '@funeralguide/test-selectors/checkbox': 'warn',
                '@funeralguide/test-selectors/input': 'warn',
                '@funeralguide/test-selectors/onChange': 'warn',
                '@funeralguide/test-selectors/onClick': 'warn',
                '@funeralguide/test-selectors/onKeyDown': 'warn',
                '@funeralguide/test-selectors/onKeyUp': 'warn',
                '@funeralguide/test-selectors/radio': 'warn',
                '@funeralguide/test-selectors/select': 'warn',
                '@funeralguide/test-selectors/textfield': 'warn',
            }
        },
        recommendedWithErrors: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                '@funeralguide/test-selectors/anchor': 'error',
                '@funeralguide/test-selectors/button': 'error',
                '@funeralguide/test-selectors/checkbox': 'error',
                '@funeralguide/test-selectors/input': 'error',
                '@funeralguide/test-selectors/onChange': 'error',
                '@funeralguide/test-selectors/onClick': 'error',
                '@funeralguide/test-selectors/onKeyDown': 'error',
                '@funeralguide/test-selectors/onKeyUp': 'error',
                '@funeralguide/test-selectors/radio': 'error',
                '@funeralguide/test-selectors/select': 'error',
                '@funeralguide/test-selectors/textfield': 'error',
            }
        }
    }
};
