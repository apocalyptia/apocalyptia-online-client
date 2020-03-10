<script>
import referenceStore from '../../stores/referenceStore'
import ContentMenu from '../../components/views/ui/ContentMenu.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'

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
<NavBar links={{back: '/', next: '/reference/core'}}/>


<style>
.content-menu {
	height: 100%;
	padding: var(--s100);
}
</style>