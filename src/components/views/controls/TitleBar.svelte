<script>
import * as sapper from '@sapper/app'
import UserMenu from './UserMenu.svelte'
</script>


<div class='title-bar'>
	<button on:click={()=>sapper.goto('/')}>
		<h1>Apocalyptia Online</h1>
		<span>0.1a</span>
	</button>
	<UserMenu/>
</div>


<style>
.title-bar {
	display: flex;
	height: var(--s300);
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
	border: var(--s1) dotted var(--alt-color);
	font-size: var(--s75);
	padding: var(--s1);
}
</style>