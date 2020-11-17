<script>
	import BackButton from 'icons/BackButton.svelte'
	import CharacterSheet from 'views/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/DeleteCharacter.js'
	import GoTo from 'utils/GoTo.js'
	import SaveCharacter from 'database/SaveCharacter.js'
	import { character } from 'stores/characterStore.js'
	import { onDestroy } from 'svelte'

	const deleteCharacter = _ => {
		DeleteCharacter(name)
		GoTo('/')
	}

	const saveCharacter = _ => {
		SaveCharacter($character)
		GoTo('/')
	}

	onDestroy(_ => SaveCharacter($character))
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Character Sheet</title>
</svelte:head>
<CharacterSheet mode={'edit'} />
<div class='btn-row'>
	<button class='small-cntr-btn' on:click={saveCharacter}>Save</button>
	<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
</div>
<BackButton path={'character'} />