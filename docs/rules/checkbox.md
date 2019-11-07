# Requires the `data-test-id` attribute on MUI <Checkbox> elements.

## Rule Details

Examples of **incorrect** code for this rule:

```html
<Checkbox value="value" />
```

Examples of **correct** code for this rule:

```html
<Checkbox value="value" data-test-id="testCheckbox" />
```

