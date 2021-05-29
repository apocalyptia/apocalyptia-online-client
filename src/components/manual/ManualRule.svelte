<script>
	import ManualRuleArticle from '/src/components/manual/ManualRuleArticle.svelte'

	export let rule
</script>


<details bind:open={rule.visible}>
	<summary>
		{rule.name}{typeof rule === "Skill" ? " Skill" : "" }
	</summary>
	<ManualRuleArticle {rule} />
</details>