<script>
import referenceStore from '../../stores/referenceStore'
import NavBar from '../../components/views/controls/NavBar.svelte'
import Capitalize from '../../components/helpers/Capitalize'
</script>


<div class='content-menu'>
	{#each $referenceStore.pageNames as page}
		<a href='/reference/{page}' class='link-btn menu-btn'>
			{Capitalize(page)}
		</a>
	{/each}
</div>
<NavBar links={{back: '/', next: '/reference/abilities'}}/>


<style>
.content-menu {
	height: 100%;
	padding: var(--s100);
}
</style>