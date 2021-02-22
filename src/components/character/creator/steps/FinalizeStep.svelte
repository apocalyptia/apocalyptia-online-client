<script>
	import CharacterSheet from 'components/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/characters/DeleteCharacter.js'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import SaveAndDeleteButtonRow from 'components/buttons/SaveAndDeleteButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(_ => SaveCharacter())
</script>


<div class='finalize-page'>
	<PageHeader chapter={'Finalize'} step={$characterStore.meta.step} />
	<div class='sheet-content'>
		<CharacterSheet mode={'readonly'} />
	</div>
	<SaveAndDeleteButtonRow
		saveFunc={_ => SaveCharacter()}
		deleteFunc={_ => DeleteCharacter($characterStore.meta.id)}
	/>
</div>


<style>
	.sheet-content {
		padding-top: var(--std-padding);
	}
</style>