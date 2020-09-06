<script>
	import Reference from '../../rules/Reference'
	import { url } from '@roxi/routify'
</script>


<div class='content-menu'>
	{#each Reference as chapter}
		<a href={$url(`/reference/${chapter.name.toLowerCase()}`)} class='link-btn menu-btn'>
			{chapter.name}
		</a>
	{/each}
</div>


<style>
	.content-menu {
		height: 100%;
		padding: var(--s100);
	}
	@media only screen and (min-width: 650px) {
		.menu-btn {
			max-width: 50%;
		}
	}
</style>