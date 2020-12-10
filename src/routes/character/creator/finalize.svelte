<script>
	import CharacterSheet from 'views/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/DeleteCharacter.js'
	import GoTo from 'utils/GoTo.js'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import SaveCharacter from 'database/SaveCharacter.js'
	import { character } from 'stores/characterStore.js'
	import { onDestroy } from 'svelte'

	const deleteCharacter = _ => {
		GoTo('/')
		DeleteCharacter()
	}

	const saveCharacter = _ => {
		GoTo('/')
		SaveCharacter($character)
	}

	onDestroy(_ => SaveCharacter($character))
</script>


<div class='finalize-page'>
	<PageHeader chapter={'Finalize'} step={$character.meta.step} />
	<div class='sheet-content'>
		<CharacterSheet mode={'readonly'} />
	</div>
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={saveCharacter}>Save</button>
		<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
	</div>
</div>


<style>
	.sheet-content {
		padding-top: var(--std-padding);
	}
</style>