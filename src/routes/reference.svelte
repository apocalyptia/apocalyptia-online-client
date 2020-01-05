<script>
	import { fade } from 'svelte/transition'

	let options = [
		'Dice',
		'Traits',
		'Skills',
		'Combat',
		'Maneuvers',
		'Situations',
		'Abilities',
		'Gear',
	]
</script>

<div in:fade>
	{#each options as option}
	<a href='/reference/{option.toLowerCase()}'>
		<button class='display-button'>
			{option}
		</button>
	</a>
	{/each}
</div>