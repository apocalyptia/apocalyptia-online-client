<script>
import * as sapper from '@sapper/app'
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
		sapper.goto('/')
	}
}
</script>


<button class='user-btn' bind:this={trigger} on:click={toggle}>
	<h1>&#9776;</h1>
</button>
<ClickOutside on:clickoutside={hide} exclude={[trigger]}>
	<div hidden={!showMenu} class='user-menu'>
		{#if $character.completed}
			<a href='/sheet' class='link-btn' on:click={hide}>Character</a>
		{:else}
			<a href='/creator' class='link-btn' on:click={hide}>Character</a>
		{/if}
		<a href='/reference' class='link-btn' on:click={hide}>Rules</a>
		<a href='/generator' class='link-btn' on:click={hide}>Generator</a>
		<a href='/' class='link-btn log-out' on:click={logOut}>Logout</a>
	</div>
</ClickOutside>
<div class='{showMenu ? "shadow" : "invisible"}'></div>


<style>
h1 {
	color: lime !important;
}
.user-btn {
	align-content: center;
	border: var(--s10) solid lime;
	display: flex;
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