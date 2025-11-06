# Avatar

Documentation for the `Avatar` component located at `components/common-ui/Avatar/Avatar.tsx`.

This component is a small wrapper around a visual avatar element that supports:

- rendering an image (with graceful fallback)
- rendering an icon or placeholder text
- online/offline badges via classes

## Props

- `image?: string` — URL of the avatar image. When provided the component attempts to load the image using Next.js `Image` and hides the placeholder while the image is loaded successfully.
- `alt?: string` — alt text for the image (defaults to `Avatar` in the component).
- `icon?: React.ReactNode` — optional icon node to render inside the avatar (e.g. an SVG component).
- `className?: string` — additional classes applied to the inner avatar wrapper (size, radius, background tokens). Example: `"bg-neutral w-24 rounded-full"`.
- `isOnline?: boolean` — when `true` adds `avatar-online`; when `false` adds `avatar-offline`.
- `placeHolder: string` — placeholder text shown when image/icon is not available (e.g., initials like `AB`).

## Behavior

- The component uses a small internal `showPlaceholder` flag to show the `placeHolder` when an image fails to load or when no image/icon is provided.
- On image load error the placeholder will be shown (via `onError` handler).

## Usage examples

```tsx
import Avatar from '@/components/common-ui/Avatar';

# Avatar

Documentation for the `Avatar` component located at `components/common-ui/Avatar/Avatar.tsx`.

This component is a small wrapper around a visual avatar element that supports:

- rendering an image (with graceful fallback)
- rendering an icon or placeholder text
- online/offline badges via classes

## Props

- `image?: string` — URL of the avatar image. When provided the component attempts to load the image using Next.js `Image` and hides the placeholder while the image is loaded successfully.
- `alt?: string` — alt text for the image (defaults to `Avatar` in the component).
- `icon?: React.ReactNode` — optional icon node to render inside the avatar (e.g. an SVG component).
- `className?: string` — additional classes applied to the inner avatar wrapper (size, radius, background tokens). Example: `"bg-neutral w-24 rounded-full"`.
- `isOnline?: boolean` — when `true` adds `avatar-online`; when `false` adds `avatar-offline`.
- `placeHolder: string` — placeholder text shown when image/icon is not available (e.g., initials like `AB`).
- `priority?: boolean` — when true, the Next.js `Image` will be marked `priority` to preload above-the-fold images and remove LCP warnings.

## Behavior

- The component uses a small internal `showPlaceholder` flag to show the `placeHolder` when an image fails to load or when no image/icon is provided.
- On image load error the placeholder will be shown (via `onError` handler).

## Usage examples

```tsx
import Avatar from '@/components/common-ui/Avatar';

// initials placeholder
<Avatar placeHolder="AB" className="bg-neutral w-24 rounded-full" />

// with image
<Avatar image="/images/user.jpg" placeHolder="JD" className="w-12 rounded-full" />

// with priority (above-the-fold LCP image)
<Avatar image="/file.svg" placeHolder="JD" className="w-24 rounded-full" priority />

// with icon
<Avatar icon={<UserIcon />} placeHolder="U" className="w-16 rounded" />

// online/offline
<Avatar placeHolder="ME" isOnline className="w-12 rounded-full" />
<Avatar placeHolder="GH" isOnline={false} className="w-12 rounded-full" />
```

## Accessibility

- The component uses a native `img` (via Next.js `Image`) for images, and sets `alt` text. If you need a custom `alt` value, pass `alt` prop.
- If the avatar is interactive (clickable), wrap it in a button or link and provide the appropriate accessible label (e.g., `aria-label="Open profile"`).

## Styling

- This component relies on daisyUI/Tailwind classes (`avatar`, `avatar-online`, `avatar-offline`, `avatar-placeholder`) for visuals. Use `className` to set width, radius, background, and other utility classes.

## Tests & Stories

- Add stories for: placeholder-only, image loaded, image error fallback, icon-only, online/offline states.
- Unit tests: verify image load error triggers placeholder, `isOnline` toggles correct class names, `className` is applied.

---

If you want the component to prefer signals instead of local state for the placeholder visibility (similar to prior request for Dropdown), I can refactor it to accept a `Signal<boolean>` or expose an `onError` callback for external control.
