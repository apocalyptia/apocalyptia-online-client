<script>
export let chapter
</script>


<h1>{chapter.name}</h1>
{#if chapter.explanation}
	<div class='explanation'>
		<p>{chapter.explanation}</p>
	</div>
{/if}
{#each chapter.list as rule}
	<details>
		<summary>
			{rule.name}
		</summary>
		<div>
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
.sub-name {
	font-weight: bold;
	text-decoration: underline;
}
</style>