<script>
import referenceStore from '../../stores/referenceStore'
import ContentMenu from '../../components/views/ui/ContentMenu.svelte'

const pages = [
	'core',
	'traits',
	'skills',
	'properties',
	'combat',
	'maneuvers',
	'status',
	'complications',
	'abilities',
	'gear'
]
</script>


<div class='content-menu'>
	{#each pages as page}
		<a class='menu-button' href='/reference/{page}'>{page.toUpperCase()}</a>
	{/each}
</div>
<div class='nav-bar'>
	<a class='nav-button' href='/'>&#9664;</a>
	<a class='nav-button home-button' href='/'>Home</a>
	<a class='nav-button' href='/reference/core'>&#9654;</a>
</div>


<style>
.content-menu {
	height: 100%;
	padding: var(--base-unit);
}
</style>