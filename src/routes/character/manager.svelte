<script>
	import adjustUIColor from '/src/utils/ui/adjustUIColor.js'
	import CharacterControls from '/src/components/character/manager/CharacterControls.svelte'
	import CharacterList from '/src/components/character/manager/CharacterList.svelte'
	import resetUIColor from '/src/utils/ui/resetUIColor.js'
	import characterStore from '/src/stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => {
		if ($characterStore) {
			adjustUIColor($characterStore)
		} else {
			resetUIColor()
		}
	})
</script>

<svelte:head>
	<title>Apocalyptia Online - Load Character</title>
</svelte:head>
<div class='cntr-card'>
	<CharacterList />
	<CharacterControls />
</div>
