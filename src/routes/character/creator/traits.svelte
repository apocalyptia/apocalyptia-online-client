<script>
	import Slider from 'views/widgets/Slider.svelte'
	import TraitsList from 'lists/TraitsList.js'
	import Traits from 'rules/Traits.js'
	import RandomTraits from 'random/RandomTraits.js'
	import { character } from 'stores/characterStore.js'

	$: remaining = Traits.remaining($character)

	const assign = (event) => $character = Traits.assign($character, event.target)

	const random = _ => $character = RandomTraits($character)

	const reset = _ => $character = $character.resetTraits()
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
	<div class='list'>
		{#each TraitsList.list as trait}
			<div class='section-card'>
				<div class='stat-label'>{trait.name}</div>
				<div class='stat-column'>
					<Slider
						name='{trait.name.toLowerCase()}'
						min={parseInt(1)}
						max={parseInt(Traits.max)}
						bind:value={$character.traits[trait.name.toLowerCase()].score}
						on:input={(event) => assign(event)}
					/>
				</div>
			</div>
		{/each}
	</div>
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={reset}>
			Reset
		</button>
		<button class='small-cntr-btn' on:click={random}>
			Random
		</button>
	</div>
</div>