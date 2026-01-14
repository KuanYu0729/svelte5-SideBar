## svelte-side-bar (Svelte 5 library)

Reusable Svelte 5 components for a slide-in sidebar with a hamburger toggle.

### Install

```bash
npm i svelte-side-bar
```

Peer dependency:

- svelte ^5

### Usage

```svelte
<script lang="ts">
	import { SideBarFrame, type Menu } from 'svelte-side-bar';

	let open = false;
	const menu: Menu[] = [
		{ key: 'home', text: 'Home' },
		{ key: 'settings', text: 'Settings' }
	];

	function onChoose(key: string) {
		console.log('chosen:', key);
	}
</script>

<SideBarFrame bind:open={open} showMenu={true} {menu} onChoose={onChoose}>
	{@const children = () => (
		<div style="padding:1rem">Your page content here</div>
	)}
</SideBarFrame>
```

### Build locally

```bash
npm install
npm run build
```

Artifacts are emitted to `dist/` as ES and CJS bundles.
