# Dropdown — implementation & daisyUI mapping

This `Dropdown` component mirrors the pattern used for `Button` — it maps props to daisyUI classes and provides a small API for controlled or uncontrolled open state, hover behavior, alignment, and placement.

Files created:

- `Dropdown.tsx` — implementation
- `type.ts` — prop types
- `index.ts` — default export

## Props (overview)

- `trigger?: React.ReactNode` — visual trigger (button content) that toggles the dropdown.
- `open?: boolean` — controlled open state.
- `defaultOpen?: boolean` — uncontrolled initial state.
- `hover?: boolean` — open on hover (mouse enter/leave).
- `align?: 'start' | 'center' | 'end'` — positions menu left/center/right via `dropdown-start`/`dropdown-end` classes.
- `placement?: 'top' | 'bottom' | 'left' | 'right'` — control `dropdown-top` / `dropdown-right` etc.
- `menuClassName?: string` — extra classes applied to the menu (`dropdown-content`).
- `menuProps?: Partial<HTMLUListElement>` — additional props for the menu element (e.g., aria attributes).
- All other `div` HTML attributes are allowed on the root wrapper.

## Usage examples

```tsx
import Dropdown from '@/components/common-ui/Dropdown';

<Dropdown
  trigger={<span className="btn">Open</span>}
  align="end"
  placement="bottom"
>
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
</Dropdown>

// hover example
<Dropdown trigger={<button className="btn">Hover me</button>} hover>
  <li><a>Hover item</a></li>
</Dropdown>
```

## Accessibility notes

- The trigger is rendered as a native `<button type="button">` so it's keyboard-accessible.
- The component supports `open` as a controlled prop so you can wire it to keyboard handlers and ARIA attributes externally.
- `menuProps` can be used to pass `role="menu"` or `aria-labelledby` as required by your accessibility strategy.

## How it maps to daisyUI

- Root wrapper uses `dropdown` + `dropdown-start` / `dropdown-end` / `dropdown-top` / `dropdown-left` / `dropdown-right`.
- The menu is rendered as `dropdown-content menu` (so daisyUI menu styles apply).

## Next steps / improvements

- Add keyboard interactions for menu items (arrow key navigation) and manage `aria-expanded`/`aria-haspopup` on the trigger.
- Add a `placementOffset` prop and animation classes if you want transitions.
- Add Storybook stories and unit tests for controlled/uncontrolled and hover modes.

---

If you want the same generator behavior as before, give me another daisyUI component page and preferred prop naming and I'll generate a ready-to-use component, doc, and optional stories.
