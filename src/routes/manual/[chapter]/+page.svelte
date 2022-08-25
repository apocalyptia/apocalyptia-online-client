<script>
	import ManualSearchbar from '$components/manual/ManualSearchbar.svelte'
	import ManualPage from '$components/manual/ManualPage.svelte'
	import Rules from '$rules/Rules.js'
	import { page } from '$app/stores'
</script>


<ManualSearchbar />
<ManualPage prefetch list={Rules[$page.data.chapter]} />
