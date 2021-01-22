<script>
	import menuStore from '$stores/menuStore.js'
</script>


<div class='cntr-card'>
	{#each $menuStore.links as link}
		<a href={link.url} class='link-btn'>{link.name}</a>
	{/each}
</div>