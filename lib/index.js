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
                '@funeralguide/eslint-plugin-test-selectors/anchor': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/button': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/checkbox': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/input': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/onChange': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/onClick': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/onKeyDown': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/onKeyUp': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/radio': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/select': 'warn',
                '@funeralguide/eslint-plugin-test-selectors/textfield': 'warn',
            }
        },
        recommendedWithErrors: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            rules: {
                '@funeralguide/eslint-plugin-test-selectors/anchor': 'error',
                '@funeralguide/eslint-plugin-test-selectors/button': 'error',
                '@funeralguide/eslint-plugin-test-selectors/checkbox': 'error',
                '@funeralguide/eslint-plugin-test-selectors/input': 'error',
                '@funeralguide/eslint-plugin-test-selectors/onChange': 'error',
                '@funeralguide/eslint-plugin-test-selectors/onClick': 'error',
                '@funeralguide/eslint-plugin-test-selectors/onKeyDown': 'error',
                '@funeralguide/eslint-plugin-test-selectors/onKeyUp': 'error',
                '@funeralguide/eslint-plugin-test-selectors/radio': 'error',
                '@funeralguide/eslint-plugin-test-selectors/select': 'error',
                '@funeralguide/eslint-plugin-test-selectors/textfield': 'error',
            }
        }
    }
};
