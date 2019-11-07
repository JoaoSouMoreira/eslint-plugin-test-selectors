# Requires the `data-test-id` attribute on MUI <TextField> elements.

## Rule Details

Examples of **incorrect** code for this rule:

```html
<TextField type="text" />
```

Examples of **correct** code for this rule:

```html
<TextField type="text" data-test-id="name" />
```

