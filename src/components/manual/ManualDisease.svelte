<script>
	import capitalize from '/src/utils/text/capitalize.js'
	import { onMount } from 'svelte'

	export let rule

	let diseaseProps = []

	onMount(() => {
		const skippedProps = [`description`, `formula`, `id`, `name`, `type`]
		diseaseProps = Object.keys(rule).filter((prop) => !skippedProps.includes(prop))
	})
</script>

<div class="disease-section">
	{#each diseaseProps as prop}
		{#if prop === 'symptoms'}
			<p><span class="prop-name">Symptoms</span>:</p>
			<ul>
				{#each rule.symptoms as symptom}
					<li>{symptom}</li>
				{/each}
			</ul>
		{:else}
			<p><span class="prop-name">{capitalize(prop)}</span>: {rule[prop]}</p>
		{/if}
	{/each}
</div>

<style>
	p {
		margin: var(--margin);
	}
	li {
		margin-left: calc(var(--margin) * 2);
	}
	.prop-name {
		font-weight: bold;
		text-decoration: underline;
	}
</style>
