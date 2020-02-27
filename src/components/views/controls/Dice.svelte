<script>
import { fade } from 'svelte/transition'
import { d6Roll } from '../../../functions/Random'

/*
	HTML CHARACTER CODES FOR DICE
	[1] = &#9856;
	[2] = &#9857;
	[3] = &#9858;
	[4] = &#9859;
	[5] = &#9860;v
	[6] = &#9861;
*/

let result = 6

const dieRoller = () => {
	for (let i = 0; i < 60000; i++) {
		setTimeout(() => { result = d6Roll() }, 50)
	}
}
</script>


<div class='sheet-section'>
	<button class='die' on:click={dieRoller}>
		<div class='die_number' transition:fade={{duration: 1000}}>{result}</div>
	</button>
</div>


<style>
.die {
	margin: 30px auto;
	height: 50px;
	width: 50px;
	border: var(--third-unit) solid var(--char-color);
	border-radius: 10px;
	text-align: center;
}
.die_number {
	font-size: 20pt;
}
</style>