<script>
	import AdjustUIColor from 'utils/ui/AdjustUIColor.js'
	import BackButton from 'components/buttons/BackButton.svelte'
	import CharacterControls from 'components/character/load/CharacterControls.svelte'
	import CharacterList from 'components/character/load/CharacterList.svelte'
	import ResetUIColor from 'utils/ui/ResetUIColor.js'
	import characterStore from 'stores/characterStore.js'
	import playerStore from 'stores/playerStore.js'
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