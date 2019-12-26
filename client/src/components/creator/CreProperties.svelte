<script>
	import { fade } from 'svelte/transition'
	import { character } from '../../stores'

	const props = Object.keys($character.props)
</script>

<div class='properties-step' in:fade>
	<div class='step-title'>
		<h2>Properties</h2>
	</div>
	{#each props as prop}
		<div class='stat-block'>
			<span>{$character.props[prop].name}</span>
			<span>{$character.props[prop].score}</span>
		</div>
	{/each}
</div>