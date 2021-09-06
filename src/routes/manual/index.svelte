<script>
	import ManualSearchbar from '/src/components/manual/ManualSearchbar.svelte'
	import ManualPage from '/src/components/manual/ManualPage.svelte'
	import Rules from '/src/rules/Rules.js'
</script>


<ManualSearchbar />
<h1>/m</h1>
<ManualPage list={Rules} />
