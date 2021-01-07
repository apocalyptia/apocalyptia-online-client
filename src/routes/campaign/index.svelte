<script>
	import CreateCampaign from 'database/campaigns/CreateCampaign.js'
	import DeleteCampaign from 'database/campaigns/DeleteCampaign.js'
	import ReadCampaigns from 'database/campaigns/ReadCampaigns.js'

	const msg = {
		word: ''
	}
</script>


<div class='cntr-card'>
	<input type='text' class='word' bind:value={msg.word} />
	<br>
	<div class='btn-row'>
		<button class='get' on:click={ReadCampaigns}>List</button>
		<button class='post' on:click={CreateCampaign}>Create</button>
		<button class='delete' on:click={DeleteCampaign}>Remove</button>
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