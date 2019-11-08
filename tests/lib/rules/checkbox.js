/**
 * @fileoverview Requires test attribute data-test-id on input elements.
 */
const rule = require('../../../lib/rules/checkbox');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { checkbox } = errors;

const checkboxError = getError(checkbox.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('checkbox', rule, {
    valid: [
        { code: `<Checkbox inputProps={{ 'data-test-id': { bar } }} />` },
        { code: `<Checkbox inputProps={{ 'data-test-id': 'foo' }} />` },
        { code: `<Checkbox disabled />` },
        { code: `<Checkbox readonly />` },
        { code: `<div></div>` },
    ].map(parserOptionsMapper),

    invalid: [
        { code: `<Checkbox data-test-id={ false } />`, errors: [checkboxError] },
        { code: `<Checkbox data-test-id={ null } />`, errors: [checkboxError] },
        { code: `<Checkbox inputProps={{}} />`, errors: [checkboxError] },
        { code: `<Checkbox inputProps={{'data-testid': 'foo'}} />`, errors: [checkboxError] },
        { code: `<Checkbox inputProps={{datatestid: 'foo'}} />`, errors: [checkboxError] },
        { code: `<Checkbox inputProps={{datatestid: null}} />`, errors: [checkboxError] },
        { code: `<Checkbox data-test-id>Foo</Checkbox>`, errors: [checkboxError] },
        { code: `<Checkbox>Foo</Checkbox>`, errors: [checkboxError] },
        { code: `<Checkbox />`, errors: [checkboxError] },
        { code: `<Checkbox disabled={ foo } />`, errors: [checkboxError] },
        { code: `<Checkbox readonly={ foo } />`, errors: [checkboxError] }
    ].map(parserOptionsMapper)
});
