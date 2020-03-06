<script>
import ToggleVisible from '../../functions/ToggleVisible'

export let chapter

const open = (rule) => {
	if (rule.visible) return 'open'
	else return ''
}
</script>


<h1>{chapter.name}</h1>
{#if chapter.explanation}
	<div class='explanation'>
		<p>{chapter.explanation}</p>
	</div>
{/if}
{#each chapter.list as rule}
	<details use:open={rule}>
		<summary
			on:click={()=>{rule.visible = !rule.visible}}
			class='name'
		>
			{rule.name}
		</summary>
		<div class='details-content'>
			{#each rule.description as desc}
				<p>{@html desc}</p>
			{/each}
			{#if rule.table}
				<svelte:component this={rule.table}/>
			{/if}
			{#if rule.subrules}
				<ul>
					{#each rule.subrules as subrule}
						<li>
							<span class='sub-name'>{subrule.name}</span>
							<div>{@html subrule.description}</div>
						</li>
					{/each}
				</ul>
			{/if}
			{#if rule.hasOwnProperty('specialties')}
				<ul>
					{#each Object.values(rule.specialties) as specialty}
						<li>
							<span class='sub-name'>{specialty.name}</span>
							{#each specialty.description as spec_desc}
								<p>{spec_desc}</p>
							{/each}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</details>
{/each}


<style>
p {
	line-height: 1.5;
}
ul {
	list-style: none;
}
li {
	margin: var(--base-unit);
}
.explanation {
	padding: var(--base-unit);
}
.name {
	font-weight: bold;
}
.details-content {
	text-align: left;
}
.sub-name {
	font-weight: bold;
	text-decoration: underline;
}
</style>