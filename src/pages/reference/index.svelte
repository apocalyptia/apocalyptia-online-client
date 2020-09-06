<script>
	import Capitalize from '../../helpers/Capitalize'
	import NavBar from '../../views/widgets/NavBar.svelte'
	import { url } from '@roxi/routify'

	const rulesPages = [
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
	{#each rulesPages as page}
		<a href={$url('/rules/:page', {page: page})} class='link-btn menu-btn'>
			{Capitalize(page)}
		</a>
	{/each}
</div>
<NavBar links={{back: '/', next: '/rules/abilities'}}/>


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