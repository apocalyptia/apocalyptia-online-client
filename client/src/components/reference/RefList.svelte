<script>
	import { slide } from 'svelte/transition'
	import { HideShow } from '../../functions/HideShow'

	export let list
</script>

<div class='ref-list'>
	<div class='separator'/>
	{#each list as rule}
		<div class='box' on:click={() => list = HideShow(rule, list)}>
			<span class='name'>{rule.name}</span>
			{#if rule.visible}
				<div class='description' transition:slide>
					{#each rule.description as desc}
						<p>{@html desc}</p>
					{/each}
					{#if rule.table}
						<div class='separator'/>
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
											{subrule.name}
										</span>
										<div class='sub-notes'>
											{@html subrule.description}
										</div>
									</div>
								</li>	
							{/each}
						</ul>
					{/if}
				</div>
			{/if}
		</div>
		<div class='separator'/>
	{/each}
</div>

<style>
	.box {
		border: 1px dotted lime;
		padding: 1rem;
	}
	.name {
		font-size: 1.25rem;
		font-weight: bold;
	}
	.description {
		padding-top: 1rem;
		text-align: left;
	}
	.separator {
		height: 1rem;
	}
	.sub-ul {
		list-style: none;
	}
	.sub-name {
		font-weight: bold;
		text-decoration: underline;
	}
</style>