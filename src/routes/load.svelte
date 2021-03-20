<script>
	import AdjustUIColor from '/src/utils/ui/AdjustUIColor.js'
	import BackButton from '/src/components/buttons/BackButton.svelte'
	import CharacterControls from '/src/components/character/load/CharacterControls.svelte'
	import CharacterList from '/src/components/character/load/CharacterList.svelte'
	import ResetUIColor from '/src/utils/ui/ResetUIColor.js'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(_ => {
		if ($playerStore.characterList.length) AdjustUIColor($characterStore)
		else ResetUIColor()
	})

	$: selectedCharacter = ``
</script>


<svelte:head>
	<title>Apocalyptia Online - Load Character</title>
</svelte:head>
<div class='cntr-card'>
	<CharacterList {selectedCharacter} />
	<CharacterControls {selectedCharacter} />
</div>
<BackButton path={'character'} />