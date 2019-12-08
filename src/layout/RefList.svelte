<script>
	import HideShow from './HideShow'

	export let list
</script>

<div class='page'>
	<h2>{list.name}</h2>
	<div class='separator'/>
	{#each list.rules as r}
		<div class='box' on:click={() => list = HideShow(r, list)}>
			<span class='name'>{r.name}</span>
			{#if r.visible}
				<div class='notes'>{@html r.notes}</div>
				{#if r.table}
					<div class='separator'/>
					<div class='table'><svelte:component this={r.table}/></div>
				{/if}
				{#if r.subrules}
					<ul class='sub-ul'>
						{#each r.subrules as s}
							<div class='separator'/>
							<li class='sub-li'>
								<div class='sub-box'>
									<span class='sub-name'>{s.name}</span>
									<div class='sub-notes'>{@html s.notes}</div>
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
	.notes {
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