<script>
	import Creation from 'rules/Creation.js'
	import CharacterSheet from 'components/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/characters/DeleteCharacter.js'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import SaveAndDeleteButtonRow from 'components/buttons/SaveAndDeleteButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'
	import { afterUpdate, onMount } from 'svelte'

	afterUpdate(_ => {
		Creation.proceedCheck($characterStore)
		$characterStore = $characterStore
		SaveCharacter()
	})

	onMount(_ => {
		$characterStore.description.player = {
			"value": $characterStore.meta.user
		}
	})
</script>


<div class='finalize-page'>
	<PageHeader chapter={'Finalize'} step={$characterStore.meta.step} />
	<div class='sheet-content'>
		<CharacterSheet mode={'edit'} />
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