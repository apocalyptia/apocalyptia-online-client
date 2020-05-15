<script>
import { beforeUpdate } from 'svelte'
import GearBlock from '../ui/GearBlock.svelte'


export let chapter

let ruleList = [...chapter.list]

$: searchTerm = ''

beforeUpdate(() => {
	ruleList = [...chapter.list]
	if (searchTerm) {
		ruleList = ruleList.filter(rule => {
			const ruleName = rule.name.toLocaleLowerCase()
			const searchName = searchTerm.toLocaleLowerCase()
			return ruleName.includes(searchName)
		})
	}
})
</script>


<svelte:head>
	<title>Apocalyptia Online Reference - {chapter.name}</title>
</svelte:head>
<div class='search-section'>
	<input type='text' class='search-bar' placeholder='Search' bind:value='{searchTerm}' />
</div>
<h2>{chapter.name}</h2>
{#if chapter.explanation}
	<div class='explanation'>
		<p>{chapter.explanation}</p>
	</div>
{/if}
{#if ruleList.length}
	{#each ruleList as rule}
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
{:else}
	<div class='no-results'>
		<p>No results.</p>
	</div>
{/if}


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
.search-section {
	margin: var(--s100);
	text-align: right;
}
.search-bar {
	padding: var(--s25);
	padding-left: var(--s100);
	text-align: left;
	width: 50%;
}
.no-results {
	padding-left: 10vw;
	padding-top: 2vh;
}
</style>