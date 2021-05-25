<script>
	import BackButton from '/src/components/buttons/BackButton.svelte'
	import CharacterSheet from '/src/components/character/sheet/CharacterSheet.svelte'
	import SaveAndDeleteButtonRow from '/src/components/buttons/SaveAndDeleteButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='sheet page-body'>
	<CharacterSheet mode={'edit'} />
	<SaveAndDeleteButtonRow
		saveFunc={() => $playerStore.saveCharacter($characterStore)}
		deleteFunc={() => $playerStore.deleteCharacter($characterStore.description.name.value)}
	/>
</div>
<BackButton path={'/character'} />