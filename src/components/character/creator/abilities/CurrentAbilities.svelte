<script>
	import Creation from 'rules/Creation.js'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'

	$: abilities = $characterStore.abilities

	const updateAbilities = _ => {
		$characterStore = Creation.updateAbilities($characterStore)
		SaveCharacter()
	}
</script>


<div class='current-abilities'>
	<div class='current-abilities-title'>Current Abilities</div>
	<div class='current-abilities-section'>
		<div class='current-abilities-header'>
			<span class='l-col'>Name</span>
			<span class='s-col'>XP</span>
			<span class='s-col'>Max</span>
			<span class='s-col'>Taken</span>
		</div>
		<div class='current-abilities-list'>
			{#each abilities as ability}
				<div class='current-ability-row'>
					<span class='l-col'>
						{ability.name}
						{#if ability.opts[0]}
							{@html ability.opts[0].name ?
								`<br>(${ability.opts[0].name})` :
								`<br>(${ability.opts[0]})`
							}
						{/if}
					</span>
					<span class='s-col'>{ability.xp}</span>
					<span class='s-col'>{ability.max}</span>
					<span class='s-col'>
						<select
							class='taken-number'
							bind:value={ability.taken}
							on:blur={updateAbilities}
						>
							{#each Array(ability.max+1) as _, i}
								<option value={i}>{i}</option>
							{/each}
						</select>
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>


<style>
	.current-abilities {
		width: 100%;
	}
	.current-abilities-title {
		font-size: var(--s125);
		font-weight: bold;
		text-align: center;
		text-decoration: underline;
		width: 100%;
	}
	.current-abilities-header,
	.current-ability-row {
		align-items: baseline;
		display: flex;
		justify-content: space-between;
		margin: var(--std-margin) 0;
	}
	.current-abilities-header {
		font-weight: bold;
		text-decoration: underline;
	}
	.l-col {
		flex: 3;
	}
	.s-col {
		flex: 1;
		text-align: center;
	}
</style>