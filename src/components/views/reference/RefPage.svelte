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
	<details bind:open={rule.visible}>
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
							<div class='sub-name'>{subrule.name}</div>
							<p class='sub-desc'>{@html subrule.description}</p>
						</li>
					{/each}
				</ul>
			{/if}
			{#if rule.hasOwnProperty('specialties')}
				<ul>
					{#each Object.values(rule.specialties) as specialty}
						<li>
							<div class='sub-name'>{specialty.name}</div>
							{#each specialty.description as spec_desc}
								<p class='spec-desc'>{spec_desc}</p>
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
}
.sub-name, .sub-desc, .spec-desc {
	margin: var(--s100);
}
</style>