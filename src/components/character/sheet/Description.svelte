<script>
	import { characterStore } from 'stores/characterStore.js'

	export let mode
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Description
	</summary>
	<div class='sheet-card'>
		<div class='name-block'>
			<span>Character:</span> 
			{#if mode == 'edit'}
				<input type='text' class='sheet-value-long' bind:value={$characterStore.description.name.value} />
			{:else if mode == 'readonly'}
				<input type='text' class='sheet-value-long' bind:value={$characterStore.description.name.value} readonly />
			{/if}
		</div>
		<div class='sheet-card-body'>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					<span>Age:</span> 
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.age.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.age.value} readonly />
					{/if}
				</div>
				<div class='sheet-card-item'>
					<span>Ht:</span> 
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.height.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.height.value} readonly />
					{/if}
				</div>
				<div class='sheet-card-item'>
					<span>Wt:</span> 
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.weight.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.weight.value} readonly />
					{/if}
				</div>
			</div>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					<span>Sex:</span>
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.sex.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.sex.value} readonly />
					{/if}
				</div>
				<div class='sheet-card-item'>
					<span>Skin:</span>
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.skin.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.skin.value} readonly />
					{/if}
				</div>
				<div class='sheet-card-item'>
					<span>Hair:</span>
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.hair.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$characterStore.description.hair.value} readonly />
					{/if}
				</div>
			</div>
		</div>
	</div>
</details>


<style>
	.name-block {
		align-items: center;
		display: flex;
		margin-bottom: var(--s100);
		padding-bottom: 0;
	}
	.sheet-card-item {
		margin-bottom: var(--s50);
		text-align: right;
	}
	.sheet-value-long {
		width: 100%;
	}
	.sheet-value {
		width: 45%;
	}
</style>