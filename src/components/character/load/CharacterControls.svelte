<script>
	import backupCharacter from '/src/utils/database/characters/backupCharacter.js'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'

	export let selectedCharacter

	function loadCharacter() {
		$playerStore.loadCharacter(selectedCharacter)
		window.location.href = '/sheet'
	}

	function newCharacter() {
		window.location.href = '/new'
	}

	function deleteCharacter() {
		$playerStore.deleteCharacter(selectedCharacter)
	}
</script>

<div class="controls">
	<div class="top-row">
		<button class="small-cntr-btn" on:click={loadCharacter}> Load </button>
		<button class="small-cntr-btn" on:click={() => backupCharacter($characterStore)}> Backup </button>
	</div>
	<div class="bottom-row">
		<button class="small-cntr-btn" on:click={newCharacter}> New </button>
		<button class="small-cntr-btn" on:click={deleteCharacter}> Delete </button>
	</div>
</div>

<style>
	.controls {
		padding-top: var(--std-padding);
		width: 100%;
	}
	div[class*='-row'] {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	.bottom-row {
		margin-top: var(--std-margin);
	}
	button {
		height: var(--square);
		max-width: calc(var(--square) * 5);
		width: 25vw;
	}
</style>
