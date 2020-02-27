<script>
import Capitalize from '../../functions/Capitalize'
import ToggleVisible from '../../functions/ToggleVisible'

export let list
</script>


{#each list as rule}
	<div class='box' on:click={() => list = ToggleVisible(rule, list)}>
		<span class='name'>{Capitalize(rule.name)}</span>
		{#if rule.visible}
			<div class='description'>
				{#each rule.description as desc}
					<p>{@html desc}</p>
				{/each}
				{#if rule.table}
					<div class='table'>
						<svelte:component this={rule.table}/>
					</div>
				{/if}
				{#if rule.subrules}
					<ul class='sub-ul'>
						{#each rule.subrules as subrule}
							<div class='separator'/>
							<li class='sub-li'>
								<div class='sub-box'>
									<span class='sub-name'>
										{Capitalize(subrule.name)}
									</span>
									<div class='sub-notes'>
										{@html subrule.description}
									</div>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
				{#if rule.hasOwnProperty('specialties')}
					<ul class='sub-ul'>
						{#each Object.values(rule.specialties) as specialty}
							<div class='separator' />
							<li class='sub-li'>
								<div class='sub-box'>
									<span class='sub-name'>
										{Capitalize(specialty.name)}
									</span>
									<div class='sub-notes'>
										{@html specialty.description}
									</div>
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
.separator {
	height: var(--base-unit);
}
.sub-ul {
	list-style: none;
}
.sub-name {
	font-weight: bold;
	text-decoration: underline;
}
</style>