<script>
import UserMenu from './UserMenu.svelte'
import { authUserStore } from '../../../stores/netlifyStore'
</script>


<div class='title-bar'>
	<a href='/' class='link-btn title-link'>
		<h1>Apocalyptia Online</h1>
		<sub>0.1a</sub>
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
	width: calc(100vw - (var(--s1) * 2));
	z-index: 2;
}
.title-link {
	width: 100%;
}
h1 {
	display: inline;
}
sub {
	color: coral;
	border: var(--s1) dotted coral;
	font-size: var(--s75);
	padding: var(--s1);
}
</style>