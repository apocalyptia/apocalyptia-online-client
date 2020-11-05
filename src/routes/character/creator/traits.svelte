<script>
	import Slider from 'views/widgets/Slider.svelte'
	import TraitsList from 'lists/TraitsList.js'
	import Traits from 'rules/Traits.js'
	import RandomTraits from 'random/RandomTraits.js'
	import { character } from 'stores/characterStore.js'

	$: remaining = Traits.remaining($character)
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Traits</title>
</svelte:head>
<div class='creator-page'>
	<h1>Traits</h1>
	<div class='explanation'>
		{#each Traits.text as line}
			<p>{line}</p>
		{/each}
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	<div class='section-card'>
		{#each TraitsList.list as trait}
			<div class='item-block'>
				<div class='trait-selection'>
					<div class='stat-label'>{trait.name}</div>
					<div class='stat-column'>
						<Slider
							name='{trait.name.toLowerCase()}'
							min={parseInt(1)}
							max={parseInt(Traits.maxPoints)}
							bind:value={$character.traits[trait.name.toLowerCase()].score}
							on:input={(event) => $character = Traits.assign($character, event.target)}
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={_ => $character = $character.resetTraits()}>
			Reset
		</button>
		<button class='small-cntr-btn' on:click={_ => $character = RandomTraits($character)}>
			Random
		</button>
	</div>
</div>


<style>
	.trait-selection {
		margin: var(--s100);
	}
</style>