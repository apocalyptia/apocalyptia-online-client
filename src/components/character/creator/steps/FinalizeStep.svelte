<script>
	import CharacterSheet from '/src/components/character/sheet/CharacterSheet.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import SaveAndDeleteButtonRow from '/src/components/buttons/SaveAndDeleteButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import creationStore from '/src/stores/creationStore.js'
	// import playerStore from '/src/stores/playerStore.js'
	import { afterUpdate, onMount } from 'svelte'

	const saveCharacter = () => {
		// $playerStore.saveCharacter($characterStore)
		window.location.href = `/sheet`
	}

	const deleteCharacter = () => {
		// $playerStore.deleteCharacter($characterStore.description.name.value)
	}

	afterUpdate(() => {
		$characterStore.proceed = $characterStore.canProceed($creationStore.step)
	})

	onMount(() => {
		$characterStore.description.player = {
			'value': $characterStore.meta.user
		}
	})
</script>


<div class='finalize-page'>
	<fieldset>
		<PageHeader chapter={'Finalize'} step={$creationStore.step} />
		<div class='sheet-content'>
			<CharacterSheet mode={'readonly'} />
		</div>
		<SaveAndDeleteButtonRow
			saveFunc={() => saveCharacter()}
			deleteFunc={() => deleteCharacter()}
		/>
	</fieldset>
</div>


<style>
	.sheet-content {
		padding-top: var(--std-padding);
	}
</style>