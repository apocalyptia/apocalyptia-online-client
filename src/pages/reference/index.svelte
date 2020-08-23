<script>
	import { url } from '@roxi/routify'
	import NavBar from '../../components/views/controls/NavBar.svelte'
	import Capitalize from '../../components/helpers/Capitalize'

	const referencePages = [
		'abilities',
		'combat',
		'complications',
		'core',
		'gear',
		'maneuvers',
		'needs',
		'properties',
		'skills',
		'status',
		'traits',
	]
</script>


<div class='content-menu'>
	{#each referencePages as page}
		<a href={$url('/reference/:page', {page: page})} class='link-btn menu-btn'>
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
	@media only screen and (min-width: 650px) {
		.menu-btn {
			max-width: 50%;
		}
	}
</style>