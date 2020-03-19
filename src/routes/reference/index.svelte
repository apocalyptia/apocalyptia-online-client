<script>
import referenceStore from '../../stores/referenceStore'
import NavBar from '../../components/views/controls/NavBar.svelte'
import Capitalize from '../../components/helpers/Capitalize'
</script>


<div class='content-menu'>
	{#each $referenceStore.pageNames as page, i}
		{#if i}
			<a href='/reference/{page}' class='link-btn menu-btn'>
				{Capitalize(page)}
			</a>
		{/if}
	{/each}
</div>
<NavBar links={{back: '/', next: '/reference/core'}}/>


<style>
.content-menu {
	height: 100%;
	padding: var(--s100);
}
</style>