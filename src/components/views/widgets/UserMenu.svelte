<script>
	import ClickOutside from 'views/widgets/ClickOutside.svelte'
	import { logout, userId } from 'stores/netlifyStore.js'

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
			window.location.assign(`www.apocalyptiaonline.com`)
		}
	}
</script>


{#if userId}
	<button class='btn-box user-btn' bind:this={trigger} on:click={toggle}>
		<div class='btn-icon'>&#9776;</div>
	</button>
	<ClickOutside on:clickoutside={hide} exclude={[trigger]}>
		<div hidden={!showMenu} class='user-menu'>
			<a href='/character' class='link-btn first-link' on:click={hide}>Character</a>
			<a href='/manual' class='link-btn' on:click={hide}>Manual</a>
			<a href='/generator' class='link-btn' on:click={hide}>Generator</a>
			<a href='/' class='link-btn last-link' on:click={logOut}>Logout</a>
		</div>
	</ClickOutside>
	<div class='{showMenu ? "shadow" : "invisible"}'></div>
{/if}


<style>
	.user-btn {
		height: var(--s300);
		position: fixed;
		right: 0;
		width: var(--s300);
		z-index: 3;
	}
	.user-btn:active,
	.user-btn:focus,
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
	a:active,
	a:focus,
	a:hover {
		background-color: lime;
		color: rgba(15, 30, 15, 1);
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