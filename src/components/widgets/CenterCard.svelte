<script>
	export let title = ''
</script>


<div class='center-card'>
	{#if title}
		<div class='titlebar'>
			<div class='title'>
				<h2>{title}</h2>
			</div>
			{#if title !== 'Main Menu'}
				<a href='/' class='close'>X</a>
			{/if}
		</div>
	{/if}
	<div class='contents'>
		<slot/>
	</div>
</div>


<style>
	.center-card {
		border: 1px solid var(--pri-color);
		box-shadow: var(--s50) var(--s50) 2px var(--sec-color-trans);
		display: flex;
		flex-direction: column;
		left: 50vw;
		max-height: 80vh;
		max-width: 800px;
		position: absolute;
		text-align: center;
		top: 50vh;
		transform: translate(-50%, -50%);
		width: 90vw;
	}
	.titlebar {
		align-items: center;
		
		color: var(--sec-color);
		display: flex;
		font-size: var(--s125);
		font-weight: bold;
		justify-content: center;
		margin-left: 3px;
		margin-right: 3px;
		margin-top: 3px;
		
	}
	.title {
		background-color: var(--pri-color-trans);
		padding: calc(var(--std-padding) / 2);
		width: 100%;
	}
	.close {
		background-color: var(--pri-color-semi);
		border-left: 2px solid var(--sec-color);
		border-right: 2px solid var(--sec-color);
		color: var(--sec-color);
		padding: calc(var(--std-padding) / 2) var(--std-padding);
		position: absolute;
		right: 0;
	}
	.close:hover {
		background-color: var(--sec-color);
		box-shadow: none;
		color: var(--pri-color);
	}
	.contents {
		border: 1px solid var(--pri-color);
		margin: 3px;
		overflow-y: scroll;
		padding: var(--std-padding);
	}
</style>
