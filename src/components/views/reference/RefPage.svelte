<script>
import GearBlock from '../ui/GearBlock.svelte'


export let chapter
</script>


<h2>{chapter.name}</h2>
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
			<GearBlock {rule}/>
			{#if rule.subrules}
				<ul>
					{#each rule.subrules as subrule}
						<li>
							<div class='sub-name'>{subrule.name}</div>
							{#each subrule.desc as sub_desc}
								<p class='sub-desc'>{sub_desc}</p>
							{/each}
						</li>
					{/each}
				</ul>
			{/if}
			{#if rule.specs}
				<ul>
					{#each Object.values(rule.specs) as spec}
						<li>
							<div class='sub-name'>{spec.name}</div>
							{#each spec.desc as spec_desc}
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
h2 {
	margin-left: var(--s100);
}
.sub-name {
	font-weight: bold;
}
.sub-name, .sub-desc, .spec-desc {
	margin: var(--s100);
}
</style>