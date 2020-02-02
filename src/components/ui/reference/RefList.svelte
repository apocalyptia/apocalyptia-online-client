<script>
	import { slide } from 'svelte/transition'
	import Capitalize from '../../helpers/Capitalize'
	import ToggleVisible from '../../helpers/ToggleVisible'

	export let list
</script>

<div class='ref-list'>
	<div class='separator'/>
	{#each list as rule}
		<div class='box' on:click={() => list = ToggleVisible(rule, list)}>
			<span class='name'>{Capitalize(rule.name)}</span>
			{#if rule.visible}
				<div class='description'>
					{#each rule.description as desc}
						<p>{@html desc}</p>
						<br>
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
				</div>
			{/if}
		</div>
		<div class='separator'/>
	{/each}
</div>

<style>
	p {
		line-height: 1.5;
	}
	.ref-list {
		margin-bottom: 3rem;
	}
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