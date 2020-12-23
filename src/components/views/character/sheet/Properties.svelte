<script>
	import { characterStore } from 'stores/characterStore.js'

	export let mode = 'readonly'
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Properties
	</summary>
	<div class='sheet-card'>
		<div class='sheet-card-body'>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					{$characterStore.properties.speed.name}: {$characterStore.properties.speed.score}
				</div>
				<div class='sheet-card-item'>
					{$characterStore.properties.carry.name}: {$characterStore.properties.carry.current} / {$characterStore.properties.carry.score}
				</div>
				<div class='sheet-card-item'>
					XP: {$characterStore.properties.xp.current} / {$characterStore.properties.xp.score}
				</div>
				<div class='sheet-card-item'>
					{$characterStore.properties.psyche.name}: 
					{#if mode == 'readonly'}
						{$characterStore.properties.psyche.current}
					{:else}
						<input type='number'
							class='current-value'
							bind:value={$characterStore.properties.psyche.current}
							min=0 max={$characterStore.properties.psyche.score}
						/>
					{/if} / {$characterStore.properties.psyche.score}
				</div>
			</div>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					{$characterStore.properties.dodge.name}: 
					{$characterStore.properties.dodge.score}
				</div>
				<div class='sheet-card-item'>
					{$characterStore.properties.block.name}: 
					{$characterStore.properties.block.score}
				</div>
				<div class='sheet-card-item'>
					{$characterStore.properties.intellect.name}: 
					{$characterStore.properties.intellect.score}
				</div>
				<div class='sheet-card-item'>
					{$characterStore.properties.luck.name}: 
					{#if mode == 'readonly'}
						{$characterStore.properties.luck.current}
					{:else}
						<input type='number'
							class='current-value'
							bind:value={$characterStore.properties.luck.current}
							min=0 max={$characterStore.properties.luck.score}
						/>
					{/if} / {$characterStore.properties.luck.score}
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