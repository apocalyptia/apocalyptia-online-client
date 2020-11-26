<script>
	export let chapterName = 'Manual'
	export let searchTerm = ''
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
		border: 1px solid var(--pri-color);
		display: flex;
		height: var(--square);
		justify-content: space-around;
		left: 0;
		position: fixed;
		right: 0;
		top: var(--square);
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
	.search-bar::placeholder {
		color: var(--pri-color);
	}
</style>