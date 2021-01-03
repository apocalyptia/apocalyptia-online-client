<script>
	const msg = {
		word: ''
	}

	const list = async _ => {
		try {
			let data = await fetch('http://localhost:5000/').then(res => res.json())
			console.log(data)
		}
		catch (err) { console.log('something went wrong', err) }
	}

	const create = async _ => {
		try {
			let data = await fetch('http://localhost:5000/', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(msg)
			}).then(res => res.json())
			console.log(data)
		}
		catch (err) { console.log('something went wrong', err) }
	}

	const remove = async _ => {
		try {
			let data = await fetch('http://localhost:5000/', {
				headers: { 'Content-Type': 'application/json' },
				method: 'DELETE',
				body: JSON.stringify(msg)
			}).then(res => res.json())
			console.log(data)
		}
		catch (err) { console.log('something went wrong', err) }
	}
</script>


<div class='cntr-card'>
	<input type='text' class='word' bind:value={msg.word} />
	<br>
	<div class='btn-row'>
		<button class='get' on:click={list}>List</button>
		<button class='post' on:click={create}>Create</button>
		<button class='delete' on:click={remove}>Remove</button>
	</div>
</div>


<style>
	.btn-row {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	button {
		width: 20vw;
	}
</style>