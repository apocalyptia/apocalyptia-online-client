<script>
	export let ability
</script>

<div class='options-section'>
		<span class='ability-options'>
			{#each ability.options as option}
				<div class='ability-option'>
					<span class='ability-option-label'>{option.name}</span>
					<span class='taken-label'>Taken: <select
							name={ability.name}
							bind:value={ability.taken}
						>
							{#each Array(ability.max+1) as _, i}
								<option value={i}>{i}</option>
							{/each}
						</select>
					</span>
				</div>
			{/each}
		</span>
</div>

<style>
	.options-section {
		margin: 1rem;
	}
	.ability-option {
		align-items: center;
		border: 1px dashed lime;
		display: flex;
		padding: 1rem;
	}
	.ability-option-label {
		flex: 2;
	}
	.taken-label {
		flex: 1;
	}
</style>