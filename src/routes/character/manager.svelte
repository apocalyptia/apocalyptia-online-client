<script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import CharacterControls from '/src/components/character/manager/CharacterControls.svelte'
	import CharacterList from '/src/components/character/manager/CharacterList.svelte'
	import adjustUIColor from '/src/utils/ui/adjustUIColor.js'
	import playerStore from '/src/stores/playerStore.js'
	import resetUIColor from '/src/utils/ui/resetUIColor.js'
	import { beforeUpdate } from 'svelte'

	console.log('### playerStore.selected = ', $playerStore.selected)

	beforeUpdate(() => {
		if ($playerStore.selected !== null) {
			adjustUIColor($playerStore.selected)
		} else {
			resetUIColor()
		}
	})
</script>

<svelte:head>
	<title>Apocalyptia Online - Character Manager</title>
</svelte:head>
<CenterCard title={'Character Manager'}>
	<CharacterList />
	<CharacterControls />
</CenterCard>
