<script>
	export let chapterName = 'Manual'
	export let searchTerm
</script>


<div class='manual-header-section'>
	<div class='rules-name'>{chapterName}</div>
	<input type='text'
		class='search-bar'
		placeholder='Search'
		bind:value='{searchTerm}'
	/>
</div>


<style>
    .manual-header-section {
		align-items: center;
		background-color: rgba(15, 30, 15, 1);
		border: 1px solid lime;
		display: flex;
		height: var(--s300);
		justify-content: space-around;
		left: 0;
		position: fixed;
		right: 0;
		top: var(--s350);
		z-index: 6;
	}
	.rules-name {
		font-size: var(--s150);
		font-weight: bold;
	}
	.search-bar {
		min-width: 100px;
		padding: var(--s25) var(--s100);
		text-align: left;
		width: 45%;
	}
</style>