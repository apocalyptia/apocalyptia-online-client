<script>
	import BackButton from 'icons/BackButton.svelte'
	import CharacterSheet from 'views/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/DeleteCharacter.js'
	import GoTo from 'utils/GoTo.js'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import SaveCharacter from 'database/SaveCharacter.js'
	import { character } from 'stores/characterStore.js'
	import { onDestroy } from 'svelte'

	const deleteCharacter = _ => {
		GoTo('/')
		DeleteCharacter(name)
	}

	const saveCharacter = _ => {
		GoTo('/')
		SaveCharacter($character)
	}

	onDestroy(_ => SaveCharacter($character))
</script>


<PageHeader rule={'Finalize'} />
<div class='sheet'>
	<CharacterSheet mode={'edit'} />
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={saveCharacter}>Save</button>
		<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
	</div>
</div>
<BackButton path={'character'} />


<style>
	.sheet {
		display: block;
		width: 100%;
	}
</style>