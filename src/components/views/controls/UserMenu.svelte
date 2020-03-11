<script>
import * as sapper from '@sapper/app'
import ClickOutside from './ClickOutside.svelte'
import { authUserStore, logout } from '../../../stores/netlifyStore'

let showMenu = false
let trigger

const toggle = () => showMenu = !showMenu

const hide = () => showMenu = false

const logOut = () => {
	logout()
		.catch(e => {
			showMenu = false
			isSpreadProperty.goto('/')
		})
}
</script>


<button class='user-button' bind:this={trigger} on:click={toggle}>
	<h1>&#9776;</h1>
</button>
<ClickOutside on:clickoutside={hide} exclude={[trigger]}>
	<div hidden={!showMenu} class='user-menu'>
		<a href='/account' class='link-button log-out' on:click={logOut}>Account</a>
		<a href='/' class='link-button log-out' on:click={logOut}>Logout</a>
	</div>
</ClickOutside>
<div class='{showMenu ? "shadow" : "invisible"}'></div>


<style>
.user-button {
	align-content: center;
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
	background: var(--scr-color);
	border: 1px solid var(--txt-color);
	position: absolute;
	right: 0vw;
	top: var(--s300);
	width: 30vw;
	min-width: 200px;
	z-index: 4;
}
.log-out {
	border: none;
	height: var(--s300);
	width: 30vw;
	min-width: 200px;
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