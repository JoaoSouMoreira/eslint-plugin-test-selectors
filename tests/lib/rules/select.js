/**
 * @fileoverview Requires test attributes on select elements.
 */
const rule = require('../../../lib/rules/select');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { select } = errors;

const selectError = getError(select.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('select', rule, {
    valid: [
        { code: `<Select inputProps={{ 'data-test-id': { bar } }} />` },
        { code: `<Select inputProps={{ 'data-test-id': 'foo' }} />` },
        { code: `<Select disabled />` },
        { code: `<Select readonly />` },
    ].map(parserOptionsMapper),

    invalid: [
        { code: `<Select data-test-id={ false } />`, errors: [selectError] },
        { code: `<Select data-test-id={ null } />`, errors: [selectError] },
        { code: `<Select inputProps={{}} />`, errors: [selectError] },
        { code: `<Select inputProps={{'data-testid': 'foo'}} />`, errors: [selectError] },
        { code: `<Select inputProps={{datatestid: 'foo'}} />`, errors: [selectError] },
        { code: `<Select inputProps={{datatestid: null}} />`, errors: [selectError] },
        { code: `<Select data-test-id>Foo</Select>`, errors: [selectError] },
        { code: `<Select>Foo</Select>`, errors: [selectError] },
        { code: `<Select />`, errors: [selectError] },
        { code: `<Select disabled={ foo } />`, errors: [selectError] },
        { code: `<Select readonly={ foo } />`, errors: [selectError] }
    ].map(parserOptionsMapper)
});
