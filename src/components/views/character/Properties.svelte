<script>
	import { character } from 'stores/characterStore.js'

	export let mode
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Properties
	</summary>
	<div class='sheet-card'>
		<div class='sheet-card-body'>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					{$character.props.speed.name}: {$character.props.speed.score}
				</div>
				<div class='sheet-card-item'>
					{$character.props.carry.name}: {$character.props.carry.current} / {$character.props.carry.score}
				</div>
				<div class='sheet-card-item'>
					XP: {$character.props.experience.remaining} / {$character.props.experience.score}
				</div>
				<div class='sheet-card-item'>
					{$character.props.psyche.name}: 
					{#if mode == 'edit'}
						<input type='number'
							class='current-value'
							bind:value={$character.props.psyche.current}
							min=0 max={$character.props.psyche.score}
						/>
					{:else if mode == 'readonly'}
						{$character.props.psyche.current}
					{/if} / {$character.props.psyche.score}
				</div>
			</div>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					{$character.props.dodge.name}: 
					{$character.props.dodge.score}
				</div>
				<div class='sheet-card-item'>
					{$character.props.block.name}: 
					{$character.props.block.score}
				</div>
				<div class='sheet-card-item'>
					{$character.props.intellect.name}: 
					{$character.props.intellect.score}
				</div>
				<div class='sheet-card-item'>
					{$character.props.luck.name}: 
					{#if mode == 'edit'}
						<input type='number'
							class='current-value'
							bind:value={$character.props.luck.current}
							min=0 max={$character.props.luck.score}
						/>
					{:else if mode == 'readonly'}
						{$character.props.luck.current}
					{/if} / {$character.props.luck.score}
				</div>
			</div>
		</div>
	</div>
</details>


<style>
	.current-value {
		width: 20%;
	}
</style>