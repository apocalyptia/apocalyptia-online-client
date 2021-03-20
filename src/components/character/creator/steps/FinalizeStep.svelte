<script>
	import Creation from '/src/rules/Creation.js'
	import CharacterSheet from '/src/components/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from '/src/database/characters/DeleteCharacter.js'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import SaveAndDeleteButtonRow from '/src/components/buttons/SaveAndDeleteButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { afterUpdate, onMount } from 'svelte'

	const saveCharacter = _ => {
		$playerStore.saveCharacter($characterStore)
		window.location.href = '/sheet'
	}

	afterUpdate(_ => {
		Creation.proceedCheck($characterStore)
		$characterStore = $characterStore
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
		<CharacterSheet mode={'readonly'} />
	</div>
	<SaveAndDeleteButtonRow
		saveFunc={saveCharacter}
		deleteFunc={_ => $playerStore.deleteCharacter($characterStore.description.name.value)}
	/>
</div>


<style>
	.sheet-content {
		padding-top: var(--std-padding);
	}
</style>