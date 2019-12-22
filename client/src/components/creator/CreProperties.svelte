<script>
	import { CharacterStore } from '../../stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	const props = Object.keys(char.props)
</script>

<div class='step'>
	<div class='step-title'>
		<h2>Properties</h2>
	</div>
	{#each props as prop}
		<div class='stat-block'>
			<span>{char.props[prop].name}</span>
			<span class='three-column'>{char.props[prop].score}</span>
		</div>
	{/each}
</div>