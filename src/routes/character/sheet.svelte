<script>
	import BackButton from '$components/buttons/BackButton.svelte'
	import CharacterSheet from '$components/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from '$database/characters/DeleteCharacter.js'
	import SaveAndDeleteButtonRow from '$components/character/creator/SaveAndDeleteButtonRow.svelte'
	import SaveCharacter from '$database/characters/SaveCharacter.js'
	import characterStore from '$stores/characterStore.js'
	import { onDestroy } from 'svelte'

	onDestroy(_ => SaveCharacter($characterStore))
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='sheet page-body'>
	<CharacterSheet mode={'edit'} />
	<SaveAndDeleteButtonRow
		saveFunc={_ => SaveCharacter($characterStore)}
		deleteFunc={_ => DeleteCharacter($characterStore)}
	/>
</div>
<BackButton path={'character'} />