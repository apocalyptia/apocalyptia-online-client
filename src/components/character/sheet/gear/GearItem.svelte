<script>
	import GearBlock from '$components/widgets/GearBlock.svelte'
	import TrashButton from '$components/buttons/TrashButton.svelte'

	export let mode,
		category,
		item,
		index = 0
</script>


<div class="gear-item">
	<GearBlock {item} {mode} />
	{#if mode != 'readonly'}
		<TrashButton {category} {index} />
	{/if}
</div>


<style>
	.gear-item {
		border: var(--solid-border);
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--s100);
		padding: var(--padding);
		width: 100%;
	}
</style>
