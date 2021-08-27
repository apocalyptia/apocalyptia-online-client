<script>
	import playerStore from '/src/stores/playerStore.js'

	function backupCharacter() {
		console.log('backup')
		$playerStore.backup()
	}
</script>

<div class="controls">
	<a href="/character/new" class="small-cntr-btn link-btn"> New </a>
	<button class="small-cntr-btn link-btn" disabled={$playerStore.selectedCharacter === null} on:click={backupCharacter}> Backup </button>
</div>

<style>
	.controls {
		display: flex;
		justify-content: space-around;
		padding-top: var(--padding);
		width: 100%;
	}
	button {
		height: var(--square);
		width: calc(var(--square) * 2);
	}
</style>
