<script>
	import characterStore from '/src/stores/characterStore.js'

	export let category, index

	function trashItem() {
		$characterStore.gear[category.name.toLowerCase()].inventory.splice(index, 1)
		$characterStore = $characterStore
	}
</script>

<button class="btn-box trash-btn crimson-btn square-btn">
	<div class="btn-icon">x</div>
</button>
