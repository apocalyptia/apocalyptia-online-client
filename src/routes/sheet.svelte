<script>
	import BackButton from 'components/buttons/BackButton.svelte'
	import CharacterSheet from 'components/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/characters/DeleteCharacter.js'
	import SaveAndDeleteButtonRow from 'components/buttons/SaveAndDeleteButtonRow.svelte'
	import characterStore from 'stores/characterStore.js'
	import { onDestroy } from 'svelte'

	onDestroy(_ => $characterStore.save())
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='sheet page-body'>
	<CharacterSheet mode={'edit'} />
	<SaveAndDeleteButtonRow
		saveFunc={_ => $characterStore.save()}
		deleteFunc={_ => DeleteCharacter($characterStore.id)}
	/>
</div>
<BackButton path={'character'} />