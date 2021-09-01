<script>
	import CharacterSheet from '/src/components/character/sheet/CharacterSheet.svelte'
	import CharacterStore from '/src/classes/stores/CharacterStore.js'
	import SaveAndDeleteButtonRow from '/src/components/buttons/SaveAndDeleteButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { goto } from '$app/navigation'

	function saveCharacter() {
		$characterStore.finalizeCharacter()
		$playerStore.saveCharacter($characterStore)
		goto(`/character/sheet`)
	}

	function deleteCharacter() {
		goto('/')
		$playerStore.deleteCharacter($characterStore)
		$playerStore = $playerStore
		$characterStore = new CharacterStore()
	}
</script>

<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class="sheet page-body">
	<CharacterSheet mode={'edit'} />
	<SaveAndDeleteButtonRow saveFunc={saveCharacter} deleteFunc={deleteCharacter} />
</div>
