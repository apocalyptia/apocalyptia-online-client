<script>
	import ManualSearchbar from '$components/manual/ManualSearchbar.svelte'
	import ManualPage from '$components/manual/ManualPage.svelte'
	import Rules from '$rules/Rules.js'
</script>


<ManualSearchbar />
<ManualPage list={Rules} />
