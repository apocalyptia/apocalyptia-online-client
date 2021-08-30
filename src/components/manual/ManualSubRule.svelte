<script>
	import linkTerms from '/src/utils/text/linkTerms.js'
	import { onMount } from 'svelte'

	export let subrule

	onMount(() => subrule.description = linkTerms(subrule.description))
</script>


<details class="subrule-details">
	<summary class="sub-name">{subrule.name}</summary>
	<div class="subrule-body">
		{#each subrule.description as description}
			<p>m {@html description}</p>
		{/each}
	</div>
</details>


<style>
	p {
		margin: var(--margin);
	}
	.subrule-details {
		margin: var(--s100);
	}
	.sub-name {
		font-weight: bold;
	}
</style>
