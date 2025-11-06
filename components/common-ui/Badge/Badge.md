# Badge

This component mirrors the daisyUI `badge` patterns and follows the same pattern used for the `Button` component in this repo.

Location: `components/common-ui/Badge`

## Props

- `children?: React.ReactNode` — content of the badge (preferred).
- `text?: string` — alternative text content.
- `style?: 'outline' | 'dash' | 'soft' | 'ghost'` — visual style tokens mapped to `badge-outline`, `badge-dash`, etc.
- `color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'` — maps to `badge-{color}`.
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` — maps to `badge-{size}`.
- `className?: string` — additional classes.
- `block?: boolean` — render as block level (adds `block` class).

## Basic usage

```tsx
import Badge from '@/components/common-ui/Badge';

<Badge>Badge</Badge>
<Badge style="outline" color="primary">Outline</Badge>
<Badge size="sm" color="accent">Small</Badge>
```

## Examples

- Sizes: `badge-xs`, `badge-sm`, `badge-md`, `badge-lg`, `badge-xl`.
- Colors: `badge-primary`, `badge-secondary`, `badge-accent`, `badge-neutral`, `badge-info`, `badge-success`, `badge-warning`, `badge-error`.
- Styles: `badge-soft`, `badge-outline`, `badge-dash`, `badge-ghost`.

## Composition

Badges are often used inline with text or inside buttons:

```tsx
<button className="btn">
  Inbox
  <Badge size="sm">+99</Badge>
</button>
```

## Accessibility & Notes

- Badges are visual annotations — if they convey important state, ensure surrounding UI has accessible equivalents (ARIA, labels).
- Avoid using badges as the only signal for critical information.

## Tests & Stories

- Add stories showing sizes, colors, styles, empty badges, and icon + text badges.
- Unit tests: ensure `className` composition, `children/text` rendering, and `block` behavior.
