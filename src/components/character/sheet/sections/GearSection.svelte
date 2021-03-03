<script>
	import characterStore from 'stores/characterStore.js'
	import GearCategory from 'components/character/sheet/gear/GearCategory.svelte'

	export let mode = 'readonly'
</script>


{#each Object.values($characterStore.gear) as category}
	<GearCategory {mode} {category} />
{/each}