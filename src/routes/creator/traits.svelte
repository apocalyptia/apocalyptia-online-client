<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import Traits from '../../components/rules/Traits'
import Slider from '../../components/views/controls/Slider.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'

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
	{#each Traits.list as trait}
		<div class='section-card'>
			<div class='stat-label'>{trait.name}</div>
			<div class='stat-column'>
				<Slider
					name='{trait.name.toLowerCase()}'
					min={parseInt(1)}
					max={parseInt(Traits.max)}
					bind:value={
						$character.traits[trait.name.toLowerCase()].base
					}
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
<NavBar links={{back: '/creator/description', next: '/creator/skills'}}/>


<style>
.section-card {
	display: block;
	margin-bottom: var(--double-unit);
}
.stat-label {
	font-weight: bold;
	text-align: center;
	width: 100%;
}
.explanation {
	padding: var(--base-unit);
}
.list {
	margin-top: var(--base-unit);
}
.remaining,
.stat-label{
	text-align: center;
}

.button-row {
	display:flex;
	justify-content: space-evenly;
	text-align: center;
	width: 100%;
}
.button-row button {
	width: 20%;
	min-width: 100px;
}
</style>