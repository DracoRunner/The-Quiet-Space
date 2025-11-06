# Button

This document is a concise style guide and usage reference for the `Button` component used across the application.

Keep the component name `Button` when importing and using it.

## Purpose

- Provide consistent interactive buttons across the app.
- Support common variants (primary, secondary, ghost), sizes, and states (disabled, loading).
- Be accessible by default.

## Install / Import

Import the component from its folder:

```tsx
import Button from '@/components/common-ui/Button';
// or
import Button from 'components/common-ui/Button';
```

If your project uses path aliases, prefer the alias import for clarity.

## Basic Usage

Render a simple button with a click handler:

```tsx
<Button onClick={() => console.log('clicked')}>Save</Button>
```

## Props (contract)

The `Button` component accepts the following core props (inferred from `type.ts`):

- `children`: ReactNode — button label or content.
- `onClick?: (e: MouseEvent) => void` — click handler.
- `variant?: 'primary' | 'secondary' | 'ghost'` — visual style variant.
- `size?: 'sm' | 'md' | 'lg'` — button size.
- `disabled?: boolean` — disables interaction and applies disabled styling.
- `loading?: boolean` — shows a loading indicator and disables the button.
- `className?: string` — additional wrapper classes for custom styling.

Note: If your project uses a different props shape in `type.ts`, treat the list above as the intended contract and keep small deviations backward-compatible.

## Visual Variants and When to Use Them

- Primary: Use for the most important call-to-action on a screen (e.g., Save, Submit).
- Secondary: Use for secondary actions that are still important but not the primary flow.
- Ghost: Low emphasis actions or when you need a transparent/outline look (e.g., Cancel, Close).

Example:

```tsx
<Button variant="primary">Submit</Button>
<Button variant="secondary">Save Draft</Button>
<Button variant="ghost">Cancel</Button>
```

## Sizing

- `sm`: compact controls for dense layouts.
- `md`: default size for most places.
- `lg`: larger prominent buttons for hero sections or mobile tappable targets.

```tsx
<Button size="sm">Small</Button>
<Button size="md">Default</Button>
<Button size="lg">Large</Button>
```

## States

- Disabled: Add `disabled` to prevent interaction. The component should expose the disabled attribute to the underlying `button` element for semantics.
- Loading: Use `loading` when an async action is in progress. The button should show a spinner/loader and be non-clickable while loading.

```tsx
<Button disabled>Disabled</Button>
<Button loading>Saving…</Button>
```

## Accessibility

- Use native `button` element semantics (role, keyboard activation, focus outline) — prefer `type="button"|"submit"` as relevant.
- Ensure that `disabled` is applied to the `button` element (not only via CSS) so assistive tech recognizes state.
- If the button triggers a long-running action, use `aria-busy` or set `aria-live` on a status region to announce completion.
- For icon-only buttons, include an accessible label using `aria-label`.

Example (icon-only):

```tsx
<Button aria-label="Close" variant="ghost">
  <CloseIcon />
</Button>
```

## Styling and Theming

- Keep button styles in the component or co-located CSS module to ensure predictability.
- Prefer utility classes (Tailwind) or tokens for spacing, colors, and radii so the button adapts to theming.
- Avoid inline styles; expose `className` for small overrides.

## Composition

- Buttons can contain icons, text, or both. Maintain consistent spacing when composing an icon and label.

```tsx
<Button>
  <SaveIcon className="mr-2" />
  Save
</Button>
```

## Testing Recommendations

- Unit tests: verify the button renders, calls `onClick`, applies `disabled` and `loading` states, and renders children.
- Accessibility tests: axe or jest-axe checks for focus, role, and label presence.
- Visual tests: snapshot or storybook stories for all variants and sizes.

## Storybook / Examples

- Add stories for: Primary/Secondary/Ghost, sizes, disabled, loading, icon-only, and combined icon + label.

## Dos and Don'ts (quick)

- Do use `Button` for any clickable control that performs an action.
- Do choose the `variant` that matches the action importance.
- Don't use buttons for navigation — use links when performing route changes unless you need form submission semantics.
- Don't rely only on color to convey state; combine color with icons or text.

## Migration Notes

If you update the prop contract, keep backward compatibility by supporting old prop names for at least one release and log the deprecation in the changelog.

## Contact / Ownership

If you need a new variant, size, or behavior, open an issue in the repo and tag the UI or frontend team for review.

---

This file should live next to the component implementation at `components/common-ui/Button/Button.md`.
