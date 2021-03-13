<script>
	import BackButton from 'components/buttons/BackButton.svelte'
	import CharacterSheet from 'components/character/sheet/CharacterSheet.svelte'
	import SaveAndDeleteButtonRow from 'components/buttons/SaveAndDeleteButtonRow.svelte'
	import characterStore from 'stores/characterStore.js'
	import playerStore from 'stores/playerStore.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='sheet page-body'>
	<CharacterSheet mode={'edit'} />
	<SaveAndDeleteButtonRow
		saveFunc={_ => $playerStore.saveCharacter($characterStore)}
		deleteFunc={_ => $playerStore.deleteCharacter($characterStore.description.name.value)}
	/>
</div>
<BackButton path={'character'} />