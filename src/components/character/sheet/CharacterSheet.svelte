<script>
	import SheetSectionsList from 'rules/lists/SheetSectionsList.js'

	export let mode
</script>


<div class="character-sheet">
	{#each SheetSectionsList.list as sheetSection}
		<section class='{sheetSection.name.toLowerCase()}-section'>
			<h2>{sheetSection.name}</h2>
			<div class='sheet-card'>
				<svelte:component this={sheetSection.content} {mode} />
			</div>
		</section>
	{/each}
</div>


<style>
	section {
		padding-top: var(--std-padding);
	}
	h2 {
		text-align: center;
	}
</style>