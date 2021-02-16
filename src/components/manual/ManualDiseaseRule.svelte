<script>
	import Capitalize from 'utils/text/Capitalize.js'
	import { onMount } from 'svelte'

	export let rule
	
	let diseaseProps = []

	onMount(_ => {
		const skippedProps = [
			`desc`,
			`formula`,
			`id`,
			`name`,
			`type`,
			`visible`,
		]
		diseaseProps = Object.keys(rule).filter(prop => !skippedProps.includes(prop))
	})
</script>


<div class='disease-section'>
	{#each diseaseProps as prop}
		{#if prop == 'symptoms'}
			<p><span class='prop-name'>Symptoms</span>:</p>
			<ul>
			{#each rule.symptoms as symptom}
				<li>{symptom}</li>
			{/each}
			</ul>
		{:else}
			<p><span class='prop-name'>{Capitalize(prop)}</span>: {rule[prop]}</p>
		{/if}
	{/each}
</div>


<style>
	p {
		margin: var(--std-margin);
	}
	li {
		margin-left: calc(var(--std-margin) * 2);
	}
	.prop-name {
		font-weight: bold;
		text-decoration: underline;
	}
</style>