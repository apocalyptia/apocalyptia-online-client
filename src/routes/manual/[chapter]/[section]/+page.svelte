<script>
	import ManualArticle from '$components/manual/ManualArticle.svelte'
	import ManualPage from '$components/manual/ManualPage.svelte'
	import ManualSearchbar from '$components/manual/ManualSearchbar.svelte'
	import Rules from '$rules/Rules.js'
	import linkRuleDescriptions from '$utils/text/linkRuleDescriptions.js'
	import { page } from '$app/stores'
</script>


{#if $page.data.chapter === 'gear'}
	<ManualSearchbar />
	<ManualPage list={Rules[$page.data.chapter][$page.data.section]} />
{:else}
	<div class="page-body">
		<ManualArticle rule={linkRuleDescriptions(Rules[$page.data.chapter][$page.data.section])} />
	</div>
{/if}
