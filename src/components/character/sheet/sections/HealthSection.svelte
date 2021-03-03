<script>
	import AdjustUIColor from 'utils/ui/AdjustUIColor.js'
	import HumanBody from 'components/widgets/HumanBody.svelte'
	import characterStore from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	export let mode = 'readonly'

	const adjustHealth = _ => {
		Object.values($characterStore.health).forEach(loc => {
			if (loc.current > loc.score) loc.current = loc.score
		})
		AdjustUIColor($characterStore)
	}

	onMount(_ => AdjustUIColor($characterStore))
</script>


<div class='body-parts-section'>
	<div class='left-column'>
		<div class='head-label'>
			<div class='body-part-name'>
				{$characterStore.health.head.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$characterStore.health.head.score}
				{:else}
					<input type='number'
						bind:value={$characterStore.health.head.current}
						min={$characterStore.health.head.score * -1}
						max={$characterStore.health.head.score}
						on:change={adjustHealth}
					/>
				{/if} / {$characterStore.health.head.score}
			</div>
		</div>
		<div class='left-arm-label'>
			<div class='body-part-name'>
				{$characterStore.health.leftArm.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$characterStore.health.leftArm.score}
				{:else}
					<input type='number'
						bind:value={$characterStore.health.leftArm.current}
						min={$characterStore.health.leftArm.score * -1}
						max={$characterStore.health.leftArm.score}
						on:change={adjustHealth}
					/>
				{/if} / {$characterStore.health.leftArm.score}
			</div>
		</div>
		<div class='left-leg-label'>
			<div class='body-part-name'>
				{$characterStore.health.leftLeg.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$characterStore.health.leftLeg.score}
				{:else}
					<input type='number'
						bind:value={$characterStore.health.leftLeg.current}
						min={$characterStore.health.leftLeg.score * -1}
						max={$characterStore.health.leftLeg.score}
						on:change={adjustHealth}
					/>
				{/if} / {$characterStore.health.leftLeg.score}
			</div>
		</div>
	</div>
	<div class='center-column'>
		<HumanBody />
	</div>
	<div class='right-column'>
		<div class='torso-label'>
			<div class='body-part-name'>
				{$characterStore.health.torso.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$characterStore.health.torso.score}
				{:else}
					<input type='number'
						bind:value={$characterStore.health.torso.current}
						min={$characterStore.health.torso.score * -1}
						max={$characterStore.health.torso.score}
						on:change={adjustHealth}
					/>
				{/if} / {$characterStore.health.torso.score}
			</div>
		</div>
		<div class='right-arm-label'>
			<div class='body-part-name'>
				{$characterStore.health.rightArm.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$characterStore.health.rightArm.score}
				{:else}
					<input type='number'
						bind:value={$characterStore.health.rightArm.current}
						min={$characterStore.health.rightArm.score * -1}
						max={$characterStore.health.rightArm.score}
						on:change={adjustHealth}
					/>
				{/if} / {$characterStore.health.rightArm.score}
			</div>
		</div>
		<div class='right-leg-label'>
			<div class='body-part-name'>
				{$characterStore.health.rightLeg.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$characterStore.health.rightLeg.score}
				{:else}
					<input type='number'
						bind:value={$characterStore.health.rightLeg.current}
						min={$characterStore.health.rightLeg.score * -1}
						max={$characterStore.health.rightLeg.score}
						on:change={adjustHealth}
					/>
				{/if} / {$characterStore.health.rightLeg.score}
			</div>
		</div>
	</div>
</div>
	
	
<style>
	input[type='number'] {
		width: 4ch;
	}
	.body-parts-section {
		display: flex;
		justify-content: space-around;
		max-width: 100%;
	}
	div[class*='column'] {
		display: block;
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
	.left-arm-label,
	.right-arm-label {
		top: 6vh;
	}
	.left-leg-label,
	.right-leg-label {
		top: 12vh;
	}
	.body-part-numbers {
		margin: 5px;
	}
</style>