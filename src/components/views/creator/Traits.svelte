<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../../stores/characterStore'
import Traits from '../../rules/Traits'
import Slider from '../controls/Slider.svelte'

let remaining = Traits.remaining($character)

const assign = (event) => {
	Traits.assign($character, event.target.name, event.target.value)
	$character = $character
}

const random = () => {
	Traits.random($character)
	$character = $character
}

const reset = () => {
	Traits.reset($character)
	$character = $character
}

beforeUpdate(() => {
	Traits.setScores($character)
	remaining = Traits.remaining($character)
	$character = $character
})
</script>


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
	{#each Object.keys($character.traits) as t}
		<div class='section-card'>
			<div>
				<span class='stat-label'>
					{$character.traits[t].name}
				</span>
			</div>
			<div class='stat-column'>
				<Slider
					name='{t.toLowerCase()}'
					min={parseInt(1)}
					max={parseInt(Traits.max)}
					bind:value={$character.traits[t].base}
					on:input={(event) => assign(event)}
				/>
			</div>
		</div>
	{/each}
</div>
<div class='button-row'>
	<button on:click={reset}>
		Reset
	</button>
	<button on:click={random}>
		Random
	</button>
</div>


<style>
@media only screen and (max-width: 768px) {
	.section-card {
		display: block;
	}
	.stat-column {
		width: 100%;
	}
	.stat-label {
		display: block;
	}
}
@media only screen and (min-width: 768px) {
	.stat-column {
		width: 50%;
	}
}
.explanation {
	padding: var(--base-unit);
}
.list {
	margin-top: var(--base-unit);
}
.remaining,
.stat-label,
.button-row {
	text-align: center;
}
</style>