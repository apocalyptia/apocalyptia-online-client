<script>
import * as sapper from '@sapper/app'
import UserMenu from './UserMenu.svelte'
import { authUserStore } from '../../../stores/netlifyStore'
</script>


<div class='title-bar'>
	<a href='/' class='link-button title-link'>
		<h1>Apocalyptia Online</h1>
		<span>0.1a</span>
	</a>
	{#if $authUserStore}
		<UserMenu/>
	{/if}
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
.title-link {
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