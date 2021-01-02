<script>
	import AdjustUIColor from 'utils/AdjustUIColor.js'
	import BackButton from 'buttons/BackButton.svelte'
	import CharacterControls from 'views/character/load/CharacterControls.svelte'
	import CharacterList from 'views/character/load/CharacterList.svelte'
	import ResetUIColor from 'utils/ResetUIColor.js'
	import { beforeUpdate } from 'svelte'
	import { characterStore } from 'stores/characterStore.js'
	import { playerStore } from 'stores/playerStore.js'

	beforeUpdate(_ => {
		$playerStore = $playerStore.loadAllCharacters()
		if ($playerStore.characterList.length) AdjustUIColor($characterStore)
		else ResetUIColor()
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Load Character</title>
</svelte:head>
<div class='cntr-card'>
	<CharacterList />
	<CharacterControls />
</div>
<BackButton path={'character'} />