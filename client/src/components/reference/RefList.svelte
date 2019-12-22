<script>
	import HideShow from '../../functions/HideShow'

	export let list
</script>

<div>
	<div class='separator'/>
	{#each list as rule}
		<div class='box' on:click={() => list = HideShow(rule, list)}>
			<span class='name'>{rule.name}</span>
			{#if rule.visible}
				<div class='description'>{@html rule.description}</div>
				{#if rule.table}
					<div class='separator'/>
					<div class='table'><svelte:component this={rule.table}/></div>
				{/if}
				{#if rule.subrules}
					<ul class='sub-ul'>
						{#each rule.subrules as subrule}
							<div class='separator'/>
							<li class='sub-li'>
								<div class='sub-box'>
									<span class='sub-name'>{subrule.name}</span>
									<div class='sub-notes'>
										{@html subrule.description}
									</div>
								</div>
							</li>	
						{/each}
					</ul>
				{/if}
			{/if}
		</div>
		<div class='separator'/>
	{/each}
</div>

<style>
	.box {
		border: 1px dotted lime;
		padding: 25px;
	}
	.name {
		font-size: 1.2em;
		font-weight: bold;
	}
	.description {
		padding-top: 25px;
	}
	.separator {
		height: 25px;
	}
	.sub-ul {
		list-style: none;
	}
	.sub-name {
		font-size: 1.1em;
		font-weight: bold;
	}
</style>