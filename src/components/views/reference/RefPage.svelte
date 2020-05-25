<script>
import { SkillFlowExplanation } from './../../rules/skills/Skills.js';
import { beforeUpdate } from 'svelte'
import GearBlock from '../ui/GearBlock.svelte'
import Table from '../../rules/Table.js';
import { values } from 'faunadb';


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
<div class='ref-header-section'>
	<div class='chapter-name'>
		{chapter.name}
	</div>
	<input type='text' class='search-bar' placeholder='Search' bind:value='{searchTerm}' />
</div>
<div class='ref-body-section'>
	{#if chapter.explanation}
		<div class='explanation'>
			{#each chapter.explanation as explanation}
				<p>{explanation}</p>
			{/each}
		</div>
	{/if}
	{#if ruleList.length}
		{#each ruleList as rule}
			<details bind:open={rule.visible}>
				<summary>
					{rule.name}
				</summary>
				<div class='rule-body'>
					{#if chapter.name == 'Gear'}
						<GearBlock {rule}/>
					{:else}
						{#if rule.desc != undefined}
							{#each rule.desc as desc}
								<p>{desc}</p>
							{/each}
							{#if chapter.name == 'Abilities'}
								<p><span class='bold'>Max:</span> {rule.max}</p>
								<p><span class='bold'>XP:</span> {rule.xp}</p>
							{/if}
						{/if}
					{/if}
					{#if rule.subrules}
						{#each rule.subrules as subrule}
							<details>
								<summary class='sub-name'>{subrule.name}</summary>
								{#each subrule.desc as sub_desc}
									<p class='sub-desc'>{sub_desc}</p>
								{/each}
							</details>
						{/each}
					{/if}
					{#if rule.table != undefined}
						<div class='rule-table'>
							<table>
								<tr class='header'>
									{#each rule.table.headers as h, i}
										<td style='max-width: {rule.table.widths[i]}%; width: {rule.table.widths[i]}%;'>{h}</td>
									{/each}
								</tr>
								{#each rule.table.contents as c, i}
									<tr>
									{#each Object.values(c) as c, i}
										<td style='max-width: {rule.table.widths[i]}%; width: {rule.table.widths[i]}%;'>{c}</td>
									{/each}
									</tr>
								{/each}
							</table>
						</div>
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
</div>


<style>
.ref-header-section {
	display: block;
	height: var(--s300);
}
.chapter-name {
	position: absolute;
	font-weight: bold;
	font-size: var(--s150);
	top: var(--s150);
	left: var(--s100);
}
.search-bar {
	position: absolute;
	top: var(--s100);
	right: var(--s100);
	width: 33%;
	min-width: 100px;
	padding: var(--s25) var(--s100);
	text-align: left;
}

.sub-name {
	font-weight: bold;
}
.sub-desc, .spec-desc {
	margin: var(--s100);
}
.no-results {
	padding-left: 10vw;
	padding-top: 2vh;
}

.bold {
	font-weight: bold;
}

.rule-table {
	margin-top: var(--s100);
}
.header {
	font-weight: bold;
	text-align: center;
}
tr {
	display: flex;
	width: 100%;
}
table {
	width: 100%;
}
</style>