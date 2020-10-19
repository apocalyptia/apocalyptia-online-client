<script>
	import Slider from 'views/widgets/Slider.svelte'
	import Traits from 'rules/traits/Traits.js'
	import { character } from 'stores/characterStore.js'

	$: remaining = Traits.remaining($character)

	const assign = (event) => $character = Traits.assign($character, event.target)

	const random = () => $character = Traits.random($character)

	const reset = () => $character = Traits.reset($character)
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Traits</title>
</svelte:head>
<h1>Traits</h1>
<div class='explanation'>
	{#each Traits.explanation as line}
		<p>{line}</p>
	{/each}
</div>
<div class='remaining'>
	<h3>Points Remaining: {remaining}</h3>
</div>
<div class='list'>
	{#each Traits.list as trait}
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