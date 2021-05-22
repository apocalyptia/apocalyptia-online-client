<script>
	import AdjustUIColor from '/src/utils/ui/AdjustUIColor.js'
	import BodyLabelColumn from '/src/components/widgets/BodyLabelColumn.svelte'
	import HumanBody from '/src/components/widgets/HumanBody.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { onMount } from 'svelte'

	export let mode = 'readonly'

	const leftColumn = [
		'head',
		'leftArm',
		'leftLeg'
	]

	const rightColumn = [
		'torso',
		'rightArm',
		'rightLeg'
	]

	onMount(() => AdjustUIColor($characterStore))
</script>


<div class='body-parts-section'>
	<div class='left-column'>
		<BodyLabelColumn side={leftColumn} {mode} />
	</div>
	<div class='center-column'>
		<HumanBody />
	</div>
	<div class='right-column'>
		<BodyLabelColumn side={rightColumn} {mode} />
	</div>
</div>
	
	
<style>
	.body-parts-section {
		display: flex;
		justify-content: space-around;
	}
	.left-column {
		text-align: left;
	}
	.center-column {
		margin-top: 10px;
		text-align: center;
	}
	.right-column {
		text-align: right;
	}
</style>