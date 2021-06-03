<script>
	//255
	//2
	//1757
	//1758

	const cursor = String.fromCharCode(2)

	let chars = cursor

	const type = (event) => {
		console.log(document.getElementsByTagName('input'))
		const content = event.target.value
		chars = content.replace(cursor, '') + cursor
	}
</script>


<div class='cntr-card'>
	<input type='text' bind:value={chars} on:input={(event) => type(event)} on:click={(event) => type(event)}>
</div>

<style>
	.cntr-card {
		position: fixed;
		top: 10vh;
		height: 50vh;
		overflow-y: scroll;
		transform: translateY(50%) translateX(-50%);
	}
	input {
		caret-color: red;
	}
</style>