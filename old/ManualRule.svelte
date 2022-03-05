<script>
	import ManualArticle from '$components/manual/ManualArticle.svelte'

	export let rule
</script>

<details>
	<summary>
		{rule.name}{typeof rule === 'Skill' ? ' Skill' : ''}
	</summary>
	<ManualArticle {rule} />
</details>
