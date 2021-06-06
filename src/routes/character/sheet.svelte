<script>
	import CharacterSheet from '/src/components/character/sheet/CharacterSheet.svelte'
	import SaveAndDeleteButtonRow from '/src/components/buttons/SaveAndDeleteButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'

	onMount((_) => {
		if ($characterStore.meta.created === ``) {
			goto('/character')
		}
	})

	function saveCharacter() {
		$characterStore.finalize()
		$playerStore.save($characterStore)
		goto(`/character/sheet`)
	}

	function deleteCharacter() {
		goto('/')
		$playerStore.delete($characterStore)
		$characterStore = $characterStore
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='sheet page-body'>
	<CharacterSheet mode={'edit'} />
	<SaveAndDeleteButtonRow saveFunc={saveCharacter} deleteFunc={deleteCharacter} />
</div>
