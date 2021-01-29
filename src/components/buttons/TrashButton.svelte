<script>
	import characterStore from '$stores/characterStore.js'

	export let category, index

	const trashItem = _ => {
		$characterStore.gear[category.name.toLowerCase()].inventory.splice(index, 1)
		$characterStore = $characterStore
	}
</script>


<button class='btn-box trash-btn crimson-btn square-btn' on:click={trashItem}>
	<div class='btn-icon'>X</div>
</button>