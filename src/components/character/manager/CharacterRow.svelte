<script>
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'

	export let character, index

	console.log('### character name = ', character.description.name.value)

	function selectCharacter() {
		console.log('select character: ', character.description.name.value)
		$playerStore.selected = character
		$characterStore = character
	}

	function deleteCharacter() {
		console.log('delete character: ', character.description.name.value)
		$playerStore.delete(character)
		$playerStore = $playerStore
		if ($characterStore.meta.id === character.meta.id) {
			$characterStore = null
		}
	}
</script>


<div class="stored-character">
	<button class="character-name" on:click={selectCharacter}>
		{index}: {character.description.name.value}
	</button>
	<button class="btn-box trash-btn crimson-btn square-btn" on:click={deleteCharacter}>
		<div class="btn-icon">X</div>
	</button>
</div>


<style>
	.stored-character {
		display: flex;
		height: var(--square);
		justify-content: space-between;
		width: 100%;
	}
	.character-name {
		align-items: center;
		border-bottom: 1px solid var(--pri-color);
		display: flex;
		height: var(--square);
		padding-left: var(--s100);
		text-align: left;
		width: 100%;
	}
	.character-name:hover {
		background-color: var(--pri-color-trans);
		color: var(--sec-color);
	}
	.stored-character:focus {
		background-color: var(--pri-color-trans);
		color: var(--sec-color);
	}
</style>
