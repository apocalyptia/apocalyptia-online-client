<script>
	import { character } from 'stores/characterStore.js'

	export let readonly
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Properties
	</summary>
	<div class='sheet-card'>
		<div class='sheet-card-body'>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					{$character.properties.speed.name}: {$character.properties.speed.score}
				</div>
				<div class='sheet-card-item'>
					{$character.properties.carry.name}: {$character.properties.carry.current} / {$character.properties.carry.score}
				</div>
				<div class='sheet-card-item'>
					XP: {$character.properties.xp.current} / {$character.properties.xp.score}
				</div>
				<div class='sheet-card-item'>
					{$character.properties.psyche.name}: 
					{#if readonly}
						{$character.properties.psyche.current}
					{:else}
						<input type='number'
							class='current-value'
							bind:value={$character.properties.psyche.current}
							min=0 max={$character.properties.psyche.score}
						/>
					{/if} / {$character.properties.psyche.score}
				</div>
			</div>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					{$character.properties.dodge.name}: 
					{$character.properties.dodge.score}
				</div>
				<div class='sheet-card-item'>
					{$character.properties.block.name}: 
					{$character.properties.block.score}
				</div>
				<div class='sheet-card-item'>
					{$character.properties.intellect.name}: 
					{$character.properties.intellect.score}
				</div>
				<div class='sheet-card-item'>
					{$character.properties.luck.name}: 
					{#if readonly}
						{$character.properties.luck.current}
					{:else}
						<input type='number'
							class='current-value'
							bind:value={$character.properties.luck.current}
							min=0 max={$character.properties.luck.score}
						/>
					{/if} / {$character.properties.luck.score}
				</div>
			</div>
		</div>
	</div>
</details>


<style>
	.current-value {
		width: 6ch;
	}
</style>