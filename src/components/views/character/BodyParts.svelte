<script>
	import AdjustUIColor from 'utils/AdjustUIColor.js'
	import { onMount } from 'svelte'

	export let character, mode

	onMount(_ => AdjustUIColor($character))
</script>


<div class='body-parts-section'>
	<div class='left-column'>
		<div class='head-label'>
			<div class='body-part-name'>
				{$character.health.head.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$character.health.head.score}
				{:else}
					<input type='number'
						bind:value='{$character.health.head.current}'
						min='-{$character.health.head.score}'
						max='{$character.health.head.score}'
						on:change={_=>AdjustUIColor($character)}
					/>
				{/if} / {$character.health.head.score}
			</div>
		</div>
		<div class='left-arm-label'>
			<div class='body-part-name'>
				{$character.health.leftArm.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$character.health.leftArm.score}
				{:else}
					<input type='number'
						bind:value='{$character.health.leftArm.current}'
						min='-{$character.health.leftArm.score}'
						max='{$character.health.leftArm.score}'
					/>
				{/if} / {$character.health.leftArm.score}
			</div>
		</div>
		<div class='left-leg-label'>
			<div class='body-part-name'>
				{$character.health.leftLeg.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$character.health.leftLeg.score}
				{:else}
					<input type='number'
						bind:value='{$character.health.leftLeg.current}'
						min='-{$character.health.leftLeg.score}'
						max='{$character.health.leftLeg.score}'
					/>
				{/if} / {$character.health.leftLeg.score}
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
				{$character.health.torso.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$character.health.torso.score}
				{:else}
					<input type='number'
						bind:value='{$character.health.torso.current}'
						min='-{$character.health.torso.score}'
						max='{$character.health.torso.score}'
						on:change={_=>AdjustUIColor($character)}
					/>
				{/if} / {$character.health.torso.score}
			</div>
		</div>
		<div class='right-arm-label'>
			<div class='body-part-name'>
				{$character.health.rightArm.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$character.health.rightArm.score}
				{:else}
					<input type='number'
						bind:value='{$character.health.rightArm.current}'
						min='-{$character.health.rightArm.score}'
						max='{$character.health.rightArm.score}'
					/>
				{/if} / {$character.health.rightArm.score}
			</div>
		</div>
		<div class='right-leg-label'>
			<div class='body-part-name'>
				{$character.health.rightLeg.name}
			</div>
			<div class='body-part-numbers'>
				{#if mode == 'readonly'}
					{$character.health.rightLeg.score}
				{:else}
					<input type='number'
						bind:value='{$character.health.rightLeg.current}'
						min='-{$character.health.rightLeg.score}'
						max='{$character.health.rightLeg.score}'
					/>
				{/if} / {$character.health.rightLeg.score}
			</div>
		</div>
	</div>
</div>


<style>
	input[type='number'] {
		width: var(--s200);
	}
	.body-parts-section {
		display: flex;
		justify-content: center;
		max-width: 100%;
	}
	div[class*=column] {
		display: block;
		height: 100%;
		width: auto;
	}
	.center-column {
		margin-top: 10px;
		text-align: center;
		width: 100%;
	}
	div[class*=-label] {
		display: inline-block;
		height: 10px;
		position: relative;
		text-align: center;
		width: 100%;
	}
	.head-label, .torso-label {
		top: 30px;
	}
	.left-arm-label, .right-arm-label {
		top: 120px;
	}
	.left-leg-label, .right-leg-label {
		top: 210px;
	}
	.body-part {
		background-color: var(--pri-color);
	}
	.body-part-numbers {
		margin: 5px;
	}
	div[class*=level] {
		display: flex;
		justify-content: center;
	}
	.head {
		border-radius: 50%;
		border: 1px;
		height: 50px;
		margin-bottom: 5px;
		width: 50px;
	}
	.arm {
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
		height: 140px;
		width: 20px;
	}
	.left-arm {
		border-top-left-radius: 30px;
	}
	.right-arm {
		border-top-right-radius: 30px;
	}
	.torso {
		color: var(--sec-color);
		height: 150px;
		margin: 0 5px;
		text-align: center;
		width: 70px;
	}
	.leg {
		border-bottom-right-radius: 15px;
		border-bottom-left-radius: 15px;
		height: 160px;
		width: 28px;
	}
	.left-leg {
		margin-right: 14px;
	}
</style>