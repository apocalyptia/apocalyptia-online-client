<script>
	import { url } from '@sveltech/routify'
	import * as routify from '@sveltech/routify'
	import ClickOutside from './ClickOutside.svelte'
	import { authUserStore, logout } from '../../../stores/netlifyStore'
	import { character } from '../../../stores/characterStore'

	let showMenu = false
	let trigger

	const toggle = () => showMenu = !showMenu

	const hide = () => showMenu = false

	const logOut = () => {
		hide()
		try {
			logout()
		}
		catch {
			showMenu = false
			routify.goto('/')
		}
	}
</script>


<button class='user-btn' bind:this={trigger} on:click={toggle}>
	&#9776;
</button>
<ClickOutside on:clickoutside={hide} exclude={[trigger]}>
	<div hidden={!showMenu} class='user-menu'>
		{#if $character.completed}
			<a href={$url('/sheet')} class='link-btn' on:click={hide}>Character</a>
		{:else}
			<a href={$url('/creator')} class='link-btn' on:click={hide}>Character</a>
		{/if}
		<a href={$url('/reference')} class='link-btn' on:click={hide}>Rules</a>
		<a href={$url('/generator')} class='link-btn' on:click={hide}>Generator</a>
		<a href={$url('/')} class='link-btn log-out' on:click={logOut}>Logout</a>
	</div>
</ClickOutside>
<div class='{showMenu ? "shadow" : "invisible"}'></div>


<style>
	.user-btn {
		align-content: center;
		border: var(--s10) solid lime;
		background-color: rgba(15, 30, 15, 1);
		color: lime;
		display: flex;
		font-size: 150%;
		height: var(--s300);
		justify-content: center;
		position: fixed;
		right: 0;
		top: 0;
		width: 10%;
		max-width: 50px;
		min-width: 50px;
		z-index: 3;
	}
	.user-btn:hover {
		background-color: lime;
		color: rgba(15, 30, 15, 1);
	}
	.user-menu {
		background: rgba(15, 30, 15, 1);
		border: var(--s1) solid lime;
		position: absolute;
		right: 0;
		top: var(--s300);
		width: 30vw;
		min-width: 200px;
		z-index: 4;
	}
	a {
		border: none;
		display: block;
		font-weight: normal;
		padding: var(--s100);
	}
	.shadow {
		background: rgba(0, 0, 0, .5);
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		z-index: 2;
	}
	.invisible {
		display: none;
	}
</style>