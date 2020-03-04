<script>
import ToggleVisible from '../../functions/ToggleVisible'

export let chapter
</script>

{#if chapter.explanation}
	<p>{chapter.explanation}</p>
{/if}
{#each chapter.list as rule}
	<div class='box' on:click={() => chapter.list = ToggleVisible(rule, chapter.list)}>
		<span class='name'>{rule.name}</span>
		{#if rule.visible}
			<div class='description'>
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
								<span class='sub-name'>
									{subrule.name}
								</span>
								<div>
									{@html subrule.description}
								</div>
							</li>
						{/each}
					</ul>
				{/if}
				{#if rule.hasOwnProperty('specialties')}
					<ul>
						{#each Object.values(rule.specialties) as specialty}
							<li>
								<span class='sub-name'>
									{specialty.name}
								</span>
								<div>
									{@html specialty.description}
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>
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
.box {
	border: var(--smallest-unit) dotted;
	margin: var(--base-unit);
	padding: var(--base-unit);
}
.name {
	font-weight: bold;
}
.description {
	padding-top: var(--base-unit);
	text-align: left;
}
.sub-name {
	font-weight: bold;
	text-decoration: underline;
}
</style>