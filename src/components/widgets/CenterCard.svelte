<script>
	import getPageTitle from '$utils/getPageTitle.js'
	import getParentURL from '$utils/getParentURL.js'
	import { onMount } from 'svelte'

	export let title = '', link = ''

	onMount(() => {
		if (!title) title = getPageTitle()
		if (!link) link = getParentURL()
	})
</script>


<div class="center-card">
	{#if title}
		<div class="titlebar">
			<div class="title">
				<h2>{title}</h2>
			</div>
			{#if title !== 'Main Menu'}
				<a href={link || '/'} class="close">X</a>
			{/if}
		</div>
	{/if}
	<div class="contents">
		<slot />
	</div>
</div>


<style>
	a {
		text-decoration: none;
	}
	.center-card {
		border: var(--solid-border);
		box-shadow: var(--s50) var(--s50) 2px var(--sec-color-trans);
		display: flex;
		flex-direction: column;
		left: 50vw;
		max-height: 80vh;
		max-width: 800px;
		position: absolute;
		text-align: center;
		top: 50vh;
		transform: translate(-50%, -50%);
		width: 90vw;
	}
	.titlebar {
		align-items: center;
		color: var(--sec-color);
		display: flex;
		font-size: var(--s125);
		font-weight: bold;
		justify-content: center;
		margin-left: 3px;
		margin-right: 3px;
		margin-top: 3px;
	}
	.title {
		background-color: var(--pri-color-trans);
		padding: calc(var(--padding) / 2);
		width: 100%;
	}
	.close {
		background-color: var(--pri-color-semi);
		border-left: 2px solid var(--sec-color);
		border-right: 2px solid var(--sec-color);
		color: var(--sec-color);
		padding: calc(var(--padding) / 2) var(--padding);
		position: absolute;
		right: 0;
	}
	.close:hover {
		background-color: var(--sec-color);
		border: var(--solid-border);
		box-shadow: none;
		color: var(--pri-color);
		margin: 3px;
		padding: calc((var(--padding) / 2) - 1px) calc(var(--padding) - 1px);
		text-decoration: none !important;
	}
	.contents {
		border: var(--solid-border);
		margin: 3px;
		overflow-y: scroll;
		padding: var(--padding);
	}
</style>
