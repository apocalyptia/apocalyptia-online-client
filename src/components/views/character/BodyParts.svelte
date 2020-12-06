<script>
	import AdjustUIColor from 'utils/AdjustUIColor.js'
	import { onMount } from 'svelte'

	export let character, readonly = true

	onMount(_ => AdjustUIColor($character))
</script>


<div class='body-parts-section'>
	<div class='left-column'>
		<div class='head-label'>
			<div class='body-part-name'>
				{$character.health.head.name}
			</div>
			<div class='body-part-numbers'>
				{#if readonly}
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
				{#if readonly}
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
				{#if readonly}
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
				{#if readonly}
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
				{#if readonly}
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
				{#if readonly}
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
		width: 6ch;
	}
	.body-parts-section {
		display: flex;
		font-size: var(--s75);
		justify-content: center;
		max-width: 100%;
	}
	div[class*=column] {
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
	div[class*=-label] {
		display: inline-block;
		height: 10px;
		position: relative;
		width: 100%;
	}
	.head-label, .torso-label {
		top: 0;
	}
	.left-arm-label, .right-arm-label {
		top: 10vh;
	}
	.left-leg-label, .right-leg-label {
		top: 20vh;
	}
	.body-part {
		background-color: var(--pri-color);
		opacity: .75;
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
		border-top-left-radius: 100vh;
	}
	.right-arm {
		border-top-right-radius: 100vh;
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