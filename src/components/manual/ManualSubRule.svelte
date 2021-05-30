<script>
	export let subrule
</script>

<details class="subrule-details">
	<summary class="sub-name">{subrule.name}</summary>
	<div class="subrule-body">
		{#each subrule.desc as sub_desc}
			<p>{sub_desc}</p>
		{/each}
	</div>
</details>

<style>
	.subrule-details {
		margin: var(--s100);
	}
	.sub-name {
		font-weight: bold;
	}
	.subrule-body {
		padding: var(--std-padding);
	}
</style>
