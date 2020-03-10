<script>
import * as sapper from '@sapper/app'
import UserMenu from './UserMenu.svelte'

const goHome = () => {
	sapper.goto('/')
}
</script>


<div class='title-bar'>
	<button on:click={goHome}>
		<h1>Apocalyptia Online</h1>
		<span>beta</span>
	</button>
	<UserMenu/>
</div>


<style>
.title-bar {
	display: flex;
	height: var(--triple-unit);
	position: fixed;
	top: 0;
	transition: top 0.3s linear;
	width: 100vw;
	z-index: 2;
}
button {
	display: inline-block;
	width: 100%;
}
h1 {
	display: inline;
}
span {
	color: var(--alt-color);
	border: var(--smallest-unit) dotted var(--alt-color);
	font-size: calc(var(--base-unit) * .75);
	padding: calc(var(--base-unit) * .25);
}
</style>