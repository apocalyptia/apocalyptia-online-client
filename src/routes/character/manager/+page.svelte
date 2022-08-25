<script>
	import CenterCard from '$components/widgets/CenterCard.svelte'
	import CharacterControls from '$components/character/manager/CharacterControls.svelte'
	import CharacterList from '$components/character/manager/CharacterList.svelte'
	import adjustUIColor from '$utils/ui/adjustUIColor.js'
	import playerStore from '$stores/playerStore.js'
	import resetUIColor from '$utils/ui/resetUIColor.js'
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
