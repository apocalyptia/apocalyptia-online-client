<script>
	import BackButton from 'components/buttons/BackButton.svelte'
	import CharacterSheet from 'components/character/sheet/CharacterSheet.svelte'
	import CompressCharacter from 'database/characters/CompressCharacter.js'
	import DeleteCharacter from 'database/characters/DeleteCharacter.js'
	import SaveAndDeleteButtonRow from 'components/character/creator/SaveAndDeleteButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'
    import playerStore from 'stores/playerStore.js'
	import { onDestroy } from 'svelte'

	const saveCharacter = _ => {
		$playerStore.currentCharacter = $characterStore
		SaveCharacter($characterStore.id, CompressCharacter($characterStore))
	}

	onDestroy(_ => saveCharacter())
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='sheet page-body'>
	<CharacterSheet mode={'edit'} />
	<SaveAndDeleteButtonRow
		saveFunc={saveCharacter}
		deleteFunc={_ => DeleteCharacter($characterStore.id)}
	/>
</div>
<BackButton path={'character'} />