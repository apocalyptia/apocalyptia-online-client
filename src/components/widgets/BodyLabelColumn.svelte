<script>
	import AdjustUIColor from 'utils/ui/AdjustUIColor.js'
	import characterStore from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	export let side, mode

	const adjustHealth = _ => {
		Object.values($characterStore.health).forEach(loc => {
			if (loc.current > loc.score) loc.current = loc.score
		})
		AdjustUIColor($characterStore)
	}

	onMount(_ => $characterStore = $characterStore.updateProperties())
</script>


{#each side as location}
	<div class='{location}-label'>
		<div class='body-part-name'>
			{$characterStore.health[location].name}
		</div>
		<div class='body-part-numbers'>
			{#if mode == 'readonly'}
				{$characterStore.health[location].score}
			{:else}
				<input type='number'
					bind:value={$characterStore.health[location].current}
					min={$characterStore.health[location].score * -1}
					max={$characterStore.health[location].score}
					on:change={adjustHealth}
				/>
			{/if} / {$characterStore.health[location].score}
		</div>
	</div>
{/each}


<style>
	input[type='number'] {
		width: 4ch;
	}
	div[class*='-label'] {
		display: inline-block;
		height: 10px;
		position: relative;
		width: 100%;
	}
	.head-label,
	.torso-label {
		top: 0;
	}
	.leftArm-label,
	.rightArm-label {
		top: 6vh;
	}
	.leftLeg-label,
	.rightLeg-label {
		top: 12vh;
	}
	.body-part-numbers {
		margin: 5px;
	}
</style>