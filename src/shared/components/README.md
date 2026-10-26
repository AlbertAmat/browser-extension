# shared/components/

Reusable React components used by **more than one UI page** (popup, options, and content UI).

## What goes here

- Building blocks you'd otherwise copy between pages: `PageHeader`, `SettingRow`, `EmptyState`, `LoadingScreen`, `ConfirmDialog`.
- Thin wrappers around MUI components that apply the extension's own defaults.

## What does NOT go here

- Components used by only one page. Keep those in that page's folder (e.g. `src/popup/components/`).
- Business logic or `chrome.*` calls. Get data through `shared/hooks/` (e.g. `useStorage`) and pass it in as props, so components stay easy to reuse and test.
- Anything imported by `background/`. The service worker can't render React.

## Conventions

- One component per file, named in PascalCase after the component: `SettingRow.tsx` exports `SettingRow`.
- Use named exports: `export function SettingRow(...)`.
- Style with MUI (`sx` prop, theme values from `shared/theme.ts`) instead of global CSS. Global CSS would also leak into pages when used in `content/ui/`.
- Type props with an interface next to the component.

```tsx
// SettingRow.tsx
import { Stack, Typography, type StackProps } from '@mui/material'
import type { ReactNode } from 'react'

interface SettingRowProps extends StackProps {
	label: string
	description?: string
	control: ReactNode
}

export function SettingRow({ label, description, control, ...rest }: SettingRowProps) {
	return (
		<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} {...rest}>
			<div>
				<Typography>{label}</Typography>
				{description && (
					<Typography variant="body2" color="text.secondary">{description}</Typography>
				)}
			</div>
			{control}
		</Stack>
	)
}
```

Import with the alias:

```tsx
import { SettingRow } from '@/shared/components/SettingRow'
```

## Moving a component here

If a component in `popup/` turns out to be needed in `options/` too, move it here and update the imports. Don't import across page folders.
