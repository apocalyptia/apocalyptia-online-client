<script>
import { fade } from 'svelte/transition'
import DieRoller from '../../../helpers/random/DieRoller'

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
</script>


<div class='sheet-section'>
	<button class='die' on:click={() => result = DieRoller()}>
		<div class='die_number' transition:fade={{duration: 1000}}>{result}</div>
	</button>
</div>


<style>
.die {
	margin: 30px auto;
	height: 50px;
	width: 50px;
	border: var(--s33) solid var(--char-color);
	border-radius: var(--radius);
	text-align: center;
}
.die_number {
	font-size: 20pt;
}
</style>