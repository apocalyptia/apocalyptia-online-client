<script>
	import BackButton from 'icons/BackButton.svelte'
	import CharacterSheet from 'views/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/DeleteCharacter.js'
	import GoTo from 'utils/GoTo.js'
	import SaveCharacter from 'database/SaveCharacter.js'
	import { characterStore } from 'stores/characterStore.js'
	import { onDestroy } from 'svelte'

	const deleteCharacter = _ => {
		DeleteCharacter(characterName)
		GoTo('/')
	}

	const saveCharacter = _ => {
		SaveCharacter($characterStore)
		GoTo('/')
	}

	onDestroy(_ => SaveCharacter($characterStore))
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='sheet page-body'>
	<CharacterSheet mode={'edit'} />
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={saveCharacter}>Save</button>
		<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
	</div>
</div>
<BackButton path={'character'} />