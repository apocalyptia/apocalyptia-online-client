<script>
	export let links
</script>

{#each links as link}
	<a href={link.url} class="link-btn">
		{link.name}
	</a>
{/each}

<style>
	a {
		margin-bottom: var(--margin);
		text-decoration: none;
	}
	a:last-child {
		margin-bottom: 0;
	}
</style>
