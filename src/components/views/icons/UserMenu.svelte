<script>
	import { fade } from 'svelte/transition';
	import ClickOutside from 'views/widgets/ClickOutside.svelte'
	// import { logout, userStore } from 'stores/userStore.js'

	let showMenu = false
	let trigger

	const toggle = _ => showMenu = !showMenu

	const hide = _ => showMenu = false

	const logOut = _ => {
		// hide()
		// try {
		// 	logout()
		// }
		// catch {
		// 	showMenu = false
		// 	window.location.assign(`/`)
		// }
	}
</script>


<!-- {#if userStore} -->
	<button class='btn-box user-btn' bind:this={trigger} on:click={toggle}>
		<div class='btn-icon'>&#9776;</div>
	</button>
	<ClickOutside on:clickoutside={hide} exclude={[trigger]}>
		{#if showMenu}
			<div class='user-menu' transition:fade>
				<nav>
					<a href='/character' class='link-btn first-link' on:click={hide}>Character</a>
					<a href='/manual' class='link-btn' on:click={hide}>Manual</a>
					<a href='/generator' class='link-btn' on:click={hide}>Generator</a>
					<!-- <a href='/' class='link-btn last-link' on:click={logOut}>Logout</a> -->
				</nav>
			</div>
		{/if}
	</ClickOutside>
	<div class='{showMenu ? "shadow" : "invisible"}'></div>
<!-- {/if} -->


<style>
	.user-btn {
		height: var(--square);
		max-height: var(--square);
		max-width: var(--square);
		min-height: var(--square);
		min-width: var(--square);
		position: fixed;
		right: 0;
		top: 0;
		width: var(--square);
		width: var(--square);
		z-index: 10;
	}
	.user-btn:focus {
		background-color: var(--pri-color);
		color: var(--sec-color);
	}
	.user-menu {
		background: var(--sec-color-trans);
		border: 1px solid var(--pri-color);
		position: absolute;
		right: 0;
		top: calc(1px + var(--square));
		width: 50vw;
		min-width: 200px;
		z-index: 1000;
	}
	a {
		border: none;
		font-weight: normal;
		height: calc(var(--square) * 2);
	}
	.shadow {
		background: rgba(0, 0, 0, .66);
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		z-index: 6;
	}
	.invisible {
		display: none;
	}
</style>