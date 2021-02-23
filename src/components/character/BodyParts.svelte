<script>
	import AdjustUIColor from 'utils/ui/AdjustUIColor.js'
	import characterStore from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	export let mode = 'readonly'

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
						bind:value='{$characterStore.health.head.current}'
						min='-{$characterStore.health.head.score}'
						max='{$characterStore.health.head.score}'
						on:change={_=>AdjustUIColor($characterStore)}
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
						bind:value='{$characterStore.health.leftArm.current}'
						min='-{$characterStore.health.leftArm.score}'
						max='{$characterStore.health.leftArm.score}'
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
						bind:value='{$characterStore.health.leftLeg.current}'
						min='-{$characterStore.health.leftLeg.score}'
						max='{$characterStore.health.leftLeg.score}'
					/>
				{/if} / {$characterStore.health.leftLeg.score}
			</div>
		</div>
	</div>
	<div class='center-column'>
		<div class='head-level'>
			<div class='head body-part' />
		</div>
		<div class='torso-level'>
			<div class='left-arm arm body-part' />
			<div class='torso body-part' />
			<div class='right-arm arm body-part' />
		</div>
		<div class='legs-level'>
			<div class='left-leg leg body-part' />
			<div class='right-leg leg body-part' />
		</div>
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
						bind:value='{$characterStore.health.torso.current}'
						min='-{$characterStore.health.torso.score}'
						max='{$characterStore.health.torso.score}'
						on:change={_=>AdjustUIColor($characterStore)}
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
						bind:value='{$characterStore.health.rightArm.current}'
						min='-{$characterStore.health.rightArm.score}'
						max='{$characterStore.health.rightArm.score}'
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
						bind:value='{$characterStore.health.rightLeg.current}'
						min='-{$characterStore.health.rightLeg.score}'
						max='{$characterStore.health.rightLeg.score}'
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
		font-size: var(--s100);
		justify-content: center;
		max-width: 100%;
		overflow: auto;
	}
	div[class*='column'] {
		display: block;
		height: 100%;
		width: auto;
	}
	.left-column {
		text-align: left;
	}
	.center-column {
		margin-top: 10px;
		text-align: center;
		width: 100%;
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
	.body-part {
		background-color: var(--pri-color);
		opacity: .75;
	}
	.body-part-numbers {
		margin: 5px;
	}
	div[class*='level'] {
		display: flex;
		justify-content: center;
	}
	.head {
		border-radius: 50%;
		border: 1px;
		height: 5vh;
		margin-bottom: .5vh;
		width: 5vh;
	}
	.arm {
		border-bottom-left-radius: 100vh;
		border-bottom-right-radius: 100vh;
		height: 15vh;
		width: 2vh;
	}
	.left-arm {
		border-top-left-radius: 200vh;
	}
	.right-arm {
		border-top-right-radius: 200vh;
	}
	.torso {
		height: 14.5vh;
		margin: 0 .5vh;
		width: 7vh;
	}
	.leg {
		border-bottom-right-radius: 100vh;
		border-bottom-left-radius: 100vh;
		height: 17vh;
		width: 2.5vh;
	}
	.left-leg {
		margin-right: 2vh;
	}
</style>