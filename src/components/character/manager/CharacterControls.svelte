<script>
	import playerStore from '$stores/playerStore.js'

	function backupCharacter() {
		console.log('backup')
		$playerStore = $playerStore.backupCharacter()
	}
</script>


<div class="controls">
	<a href="/character/new" class="small-cntr-btn link-btn"> New </a>
	<button class="small-cntr-btn link-btn" disabled={$playerStore.selectedCharacter === null} on:click={backupCharacter}> Backup </button>
</div>


<style>
	a {
		text-decoration: none;
	}
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
