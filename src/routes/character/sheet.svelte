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
</script>

<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class="sheet page-body">
	<CharacterSheet mode={'edit'} />
	<SaveAndDeleteButtonRow
		saveFunc={() => $playerStore.saveCharacter($characterStore)}
		deleteFunc={() => $playerStore.deleteCharacter($characterStore.description.name.value)}
	/>
</div>
