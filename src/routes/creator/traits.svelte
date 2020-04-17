<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import Traits from '../../components/rules/Traits'
import Slider from '../../components/views/controls/Slider.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'


let remaining = Traits.remaining($character)

let next = `/creator/traits`

const assign = (event) => $character = Traits.assign($character, event.target)

const random = () => $character = Traits.random($character)

const reset = () => $character = Traits.reset($character)

beforeUpdate(() => {
	remaining = Traits.remaining($character)
	if (remaining == 0) next = `/creator/skills`
	else next = `/creator/traits`
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
					bind:value={$character.traits[trait.name.toLowerCase()].score}
					on:input={(event) => assign(event)}
				/>
			</div>
		</div>
	{/each}
</div>
<div class='btn-row'>
	<button on:click={reset}>
		Reset
	</button>
	<button on:click={random}>
		Random
	</button>
</div>
<NavBar links={{ back: '/creator/description', next: next }} status={remaining == 0 ? `go` : `stop`}/>