<script>
	import adjustUIColor from '/src/utils/ui/adjustUIColor.js'
	import CharacterControls from '/src/components/character/load/CharacterControls.svelte'
	import CharacterList from '/src/components/character/load/CharacterList.svelte'
	import resetUIColor from '/src/utils/ui/resetUIColor.js'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		if ($playerStore.characterList.length) {
			adjustUIColor($characterStore)
		} else {
			resetUIColor()
		}
	})

	$: selectedCharacter = ``
</script>

<svelte:head>
	<title>Apocalyptia Online - Load Character</title>
</svelte:head>
<div class="cntr-card">
	<CharacterList {selectedCharacter} />
	<CharacterControls {selectedCharacter} />
</div>
