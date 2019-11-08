/**
 * @fileoverview Requires test attributes on radio elements.
 */
const rule = require('../../../lib/rules/radio');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { radio } = errors;

const radioError = getError(radio.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('checkbox', rule, {
    valid: [
        { code: `<Radio inputProps={{ 'data-test-id': { bar } }} />` },
        { code: `<Radio inputProps={{ 'data-test-id': 'foo' }} />` },
        { code: `<Radio disabled />` },
        { code: `<Radio readonly />` },
        { code: `<div></div>` },
    ].map(parserOptionsMapper),

    invalid: [
        { code: `<Radio data-test-id={ false } />`, errors: [radioError] },
        { code: `<Radio data-test-id={ null } />`, errors: [radioError] },
        { code: `<Radio inputProps={{}} />`, errors: [radioError] },
        { code: `<Radio inputProps={{'data-testid': 'foo'}} />`, errors: [radioError] },
        { code: `<Radio inputProps={{datatestid: 'foo'}} />`, errors: [radioError] },
        { code: `<Radio inputProps={{datatestid: null}} />`, errors: [radioError] },
        { code: `<Radio data-test-id>Foo</Radio>`, errors: [radioError] },
        { code: `<Radio>Foo</Radio>`, errors: [radioError] },
        { code: `<Radio />`, errors: [radioError] },
        { code: `<Radio disabled={ foo } />`, errors: [radioError] },
        { code: `<Radio readonly={ foo } />`, errors: [radioError] }
    ].map(parserOptionsMapper)
});
