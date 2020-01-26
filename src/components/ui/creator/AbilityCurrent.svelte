<script>
	import { character } from '../../../stores'

	const modify = ability => {
		for (let i = 0; i < $character.abilities.length; ++i) {
			if ($character.abilities[i].name == ability.name) {
				$character.abilities[i].taken = ability.taken
			}
		}
		console.log($character.abilities)
	}

	const remove = ability => {
		$character.abilities = $character.abilities.filter((c) => {
			return c.id != ability.id
		})
	}
</script>

<div class='current-abilities'>
	<div class='current-abilities-title'>Current Abilities</div>
	<div class='current-abilities-section'>
		<div class='current-abilities-header'>
			<span class='l-col'>Name</span>
			<span class='s-col'>XP</span>
			<span class='s-col'>Taken</span>
			<span class='s-col'>Remove</span>
		</div>
		<div class='current-abilities-list'>
			{#each $character.abilities as ability}
				<div class='current-ability-row'>
					<span class='l-col'>
						{ability.name}
						{#if ability.options[0] != ""}
							&nbsp;({ability.options[ability.selection].name})
						{/if}
					</span>
					<span class='s-col'>{ability.xp}</span>
					<span class='s-col'>
						<select
							class='taken-number'
							bind:value={ability.taken}
							on:change={(event) => modify(ability)}
						>
							<option value=1>1</option>
							{#if ability.max > 1 && ability.max <= 3}
								<option value=2>2</option>
								<option value=3>3</option>
							{/if}
						</select>
					</span>
					<span class='s-col'>
						<button
							on:click={remove(ability)}
						>X</button>
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
		font-size: 1.25rem;
		text-align: center;
		width: 100%;
	}
	.l-col {
		display: inline-block;
		width: 50%;
	}
	.s-col {
		display: inline-block;
		width: 15%;
	}
</style>