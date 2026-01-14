<script lang="ts">
	import type { Snippet } from "svelte";
	import Hamburger from "./Hamburger.svelte";
	import type { Menu } from "../interface/Menu";
	let {
		open = $bindable(),
		showMenu,
		menuList,
		children,
		onChoose,
	}: {
		open?: boolean;
		showMenu: boolean;
		menuList?: Menu[];
		children?: Snippet;
		onChoose?: (key: string) => void;
	} = $props();
	let displayMenuList = $state<Menu[]>([]);
	$effect(() => {
		if (Array.isArray(menuList)) {
			displayMenuList = menuList;
		} else {
			displayMenuList = [];
		}
	});
	let isOpen: boolean = $state(false);
	$effect(() => {
		if (typeof open === "undefined") {
			isOpen = false;
		} else {
			isOpen = open;
		}
	});
</script>

<div class="frame">
	<div class="header">
		<div class="hamburger-container" class:hide={!showMenu}>
			<Hamburger bind:open={isOpen}></Hamburger>
		</div>
	</div>
	<div class="body">
		{#if children}
			{@render children()}
		{/if}
	</div>
	<div class="side-bar" class:open={isOpen}>
		<div class="side-bar-menu">
			{#each displayMenuList as item}
				<button
					class="item"
					onclick={() => {
						if (typeof onChoose === "function") {
							onChoose(item.key);
						}
					}}
				>
					{item.text}
				</button>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.frame {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
		height: 100%;
		.header {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			padding: 0.5rem;
			.hamburger-container {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				&.hide {
					display: none;
				}
			}
		}
		.body {
			display: flex;
			flex-direction: column;
			flex: 1;
		}
	}
	.side-bar {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: var(--side-menu-bg-color, #e5e7eb);
		--side-menu-shadow: 0 10px 15px -3px var(--side-menu-shadow-color, rgb(0 0 0 /
							0.1)),
			0 4px 6px -4px var(--side-menu-shadow-color, rgb(0 0 0 / 0.1));
		box-shadow: var(--side-menu-inset-shadow),
			var(--side-menu-inset-ring-shadow), var(--side-menu-ring-offset-shadow),
			var(--side-menu-ring-shadow), var(--side-menu-shadow);
		left: -100%;
		border-right: 2px solid #000000;
		transition: left 0.3s ease-in-out;
		&.open {
			left: 0px;
		}
		.side-bar-menu {
			padding: 3rem;
			font-size: 20px;
			line-height: 1.4;
			gap: 0.5rem;
			display: flex;
			flex-direction: column;
			.item {
				cursor: pointer;
			}
		}
	}
</style>
