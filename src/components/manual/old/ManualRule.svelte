<script>
	import ManualArticle from '/src/components/manual/ManualArticle.svelte'

	export let rule
</script>

<details bind:open={rule.visible}>
	<summary>
		{rule.name}{typeof rule === 'Skill' ? ' Skill' : ''}
	</summary>
	<ManualArticle {rule} />
</details>
