<script>
	import { character } from 'stores/characterStore.js'

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
				<input type='text' class='sheet-value-long' bind:value={$character.desc.name.value} />
			{:else if mode == 'readonly'}
				<input type='text' class='sheet-value-long' bind:value={$character.desc.name.value} readonly />
			{/if}
		</div>
		<div class='sheet-card-body'>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					<span>Age:</span> 
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$character.desc.age.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$character.desc.age.value} readonly />
					{/if}
				</div>
				<div class='sheet-card-item'>
					<span>Height:</span> 
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$character.desc.height.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$character.desc.height.value} readonly />
					{/if}
				</div>
				<div class='sheet-card-item'>
					<span>Weight:</span> 
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$character.desc.weight.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$character.desc.weight.value} readonly />
					{/if}
				</div>
			</div>
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					<span>Sex:</span>
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$character.desc.sex.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$character.desc.sex.value} readonly />
					{/if}
				</div>
				<div class='sheet-card-item'>
					<span>Skin:</span>
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$character.desc.skin.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$character.desc.skin.value} readonly />
					{/if}
				</div>
				<div class='sheet-card-item'>
					<span>Hair:</span>
					{#if mode == 'edit'}
						<input type='text' class='sheet-value' bind:value={$character.desc.hair.value} />
					{:else if mode == 'readonly'}
						<input type='text' class='sheet-value' bind:value={$character.desc.hair.value} readonly />
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