<script>
	export let title = ''
</script>


<div class='center-card'>
	{#if title}
		<div class='title'>
			<h2>{title}</h2>
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
	.title {
		align-items: center;
		background-color: var(--pri-color-trans);
		/* border: 1px solid var(--pri-color); */
		color: var(--sec-color);
		display: flex;
		font-size: var(--s125);
		font-weight: bold;
		justify-content: center;
		margin-left: 3px;
		margin-right: 3px;
		margin-top: 3px;
		padding: calc(var(--std-padding) / 2);
	}
	.close {
		position: absolute;
		padding: calc(var(--std-padding) / 2) var(--std-padding);
		right: 0;
		border-left: 2px solid var(--sec-color);
		color: var(--sec-color);
	}
	.close:hover {
		color: var(--pri-color);
		background-color: var(--sec-color);
		border: 1px solid var(--pri-color);
	}
	.contents {
		overflow-y: scroll;
		padding: var(--std-padding);
		border: 1px solid var(--pri-color);
		margin: 3px;
	}
</style>
