<script>
import { character } from '../../../stores/characterStore'

export let MasterAbilityList

const updateAbilities = () => {
	$character.abilities = MasterAbilityList.filter(ability => ability.taken)
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
			{#each $character.abilities as ability}
				<div class='current-ability-row'>
					<span class='l-col'>
						{ability.name}
						{#if ability.options[0]}
							&nbsp;({ability.options[0].name})
						{/if}
					</span>
					<span class='s-col'>{ability.xp}</span>
					<span class='s-col'>{ability.max}</span>
					<span class='s-col'>
						<select
							class='taken-number'
							bind:value={ability.taken}
							on:change={updateAbilities}
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
	font-size: calc(var(--base-unit) * 1.25);
	text-align: center;
	width: 100%;
}
.current-abilities-header,
.current-ability-row {
	align-items: baseline;
	display: flex;
	justify-content: space-between;
	margin: var(--base-unit) 0;
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