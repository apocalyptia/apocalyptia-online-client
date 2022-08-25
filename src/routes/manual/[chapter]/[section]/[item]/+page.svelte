<script>
	import ManualArticle from '$components/manual/ManualArticle.svelte'
	import Rules from '$rules/Rules.js'
	import linkRuleDescriptions from '$utils/text/linkRuleDescriptions.js'
	import { page } from '$app/stores'
</script>


<div class="page-body">
	<ManualArticle rule={linkRuleDescriptions(Rules[$page.data.chapter][$page.data.section][$page.data.item])} />
</div>
