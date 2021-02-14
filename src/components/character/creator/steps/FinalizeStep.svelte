<script>
	import CharacterSheet from 'components/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/characters/DeleteCharacter.js'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import SaveAndDeleteButtonRow from 'components/character/creator/SaveAndDeleteButtonRow.svelte'
	import characterStore from 'stores/characterStore.js'
	import { onDestroy } from 'svelte'

	// onDestroy(_ => SaveCharacter($characterStore))
</script>


<div class='finalize-page'>
	<PageHeader chapter={'Finalize'} step={$characterStore.meta.step} />
	<div class='sheet-content'>
		<CharacterSheet mode={'readonly'} />
	</div>
	<SaveAndDeleteButtonRow
		saveFunc={_ => SaveCharacter($characterStore)}
		deleteFunc={_ => DeleteCharacter($characterStore.meta.name)}
	/>
</div>


<style>
	.sheet-content {
		padding-top: var(--std-padding);
	}
</style>