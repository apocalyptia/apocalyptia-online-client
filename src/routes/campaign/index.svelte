<script>
	import BackButton from '$components/buttons/BackButton.svelte'
	import CreateCampaign from '$database/campaigns/CreateCampaign.js'
	import DeleteCampaign from '$database/campaigns/DeleteCampaign.js'
	import ReadCampaigns from '$database/campaigns/ReadCampaigns.js'

	const msg = {
		word: ''
	}
</script>


<div class='cntr-card'>
	<input type='text' class='word' bind:value={msg.word} />
	<button class='get' on:click={ReadCampaigns}>List</button>
	<button class='post' on:click={CreateCampaign}>Create</button>
	<button class='delete' on:click={DeleteCampaign}>Remove</button>
</div>
<BackButton path={'/'} />


<style>
	button {
		margin-top: var(--std-margin);
		width: 50%;
	}
</style>