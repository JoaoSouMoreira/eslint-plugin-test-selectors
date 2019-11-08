/**
 * @fileoverview Requires test attribute data-test-id on input elements.
 */
const rule = require('../../../lib/rules/textfield');
const RuleTester = require('eslint').RuleTester;
const parserOptionsMapper = require('../../parserOptionsMapper');
const {
    defaults,
    errors
} = require('../../../lib/constants');
const { getError } = require('../../../lib/utils');

const { textfield } = errors;

const textfieldError = getError(textfield.message, defaults.testAttribute);

const ruleTester = new RuleTester();
ruleTester.run('textfield', rule, {
    valid: [
        { code: `<TextField inputProps={{ 'data-test-id': { bar } }} />` },
        { code: `<TextField inputProps={{ 'data-test-id': 'foo' }} />` },
        { code: `<TextField disabled />` },
        { code: `<TextField readonly />` },
        { code: `<div></div>` },
    ].map(parserOptionsMapper),

    invalid: [
        { code: `<TextField data-test-id={ false } />`, errors: [textfieldError] },
        { code: `<TextField data-test-id={ null } />`, errors: [textfieldError] },
        { code: `<TextField inputProps={{}} />`, errors: [textfieldError] },
        { code: `<TextField inputProps={{'data-testid': 'foo'}} />`, errors: [textfieldError] },
        { code: `<TextField inputProps={{datatestid: 'foo'}} />`, errors: [textfieldError] },
        { code: `<TextField inputProps={{datatestid: null}} />`, errors: [textfieldError] },
        { code: `<TextField data-test-id>Foo</TextField>`, errors: [textfieldError] },
        { code: `<TextField>Foo</TextField>`, errors: [textfieldError] },
        { code: `<TextField />`, errors: [textfieldError] },
        { code: `<TextField disabled={ foo } />`, errors: [textfieldError] },
        { code: `<TextField readonly={ foo } />`, errors: [textfieldError] }
    ].map(parserOptionsMapper)
});
