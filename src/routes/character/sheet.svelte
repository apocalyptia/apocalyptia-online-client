<script>
	import CharacterSheet from '$components/character/sheet/CharacterSheet.svelte'
	import CharacterStore from '$classes/stores/CharacterStore.js'
	import SaveAndDeleteButtonRow from '$components/buttons/SaveAndDeleteButtonRow.svelte'
	import characterStore from '$stores/characterStore.js'
	import playerStore from '$stores/playerStore.js'
	import { goto } from '$app/navigation'

	function saveCharacter() {
		$characterStore = $characterStore.finalizeCharacter()
		$playerStore = $playerStore.saveCharacter($characterStore)
		goto(`/character/sheet`)
	}

	function deleteCharacter() {
		goto('/')
		$playerStore = $playerStore.deleteCharacter($characterStore)
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
