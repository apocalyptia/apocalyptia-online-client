<script>
	import { character } from 'src/stores/characterStore'
</script>


<details class='sheet-card' open>
	<summary class='sheet-card-title'>
		Description
	</summary>
	<div class='name-block'>
		<span>Character:</span> 
		<input type='text' class='sheet-value-long' bind:value={$character.desc.identity.value} />
	</div>
	<div class='sheet-card-body'>
		<div class='sheet-card-block'>
			<div class='sheet-card-item'>
				<span>Age:</span> 
				<input type='text' class='sheet-value' bind:value={$character.desc.age.value} />
			</div>
			<div class='sheet-card-item'>
				<span>Height:</span> 
				<input type='text' class='sheet-value' bind:value={$character.desc.height.value} />
			</div>
			<div class='sheet-card-item'>
				<span>Weight:</span> 
				<input type='text' class='sheet-value' bind:value={$character.desc.weight.value} />
			</div>
		</div>
		<div class='sheet-card-block'>
			<div class='sheet-card-item'>
				<span>Sex:</span> 
				<input type='text' class='sheet-value' bind:value={$character.desc.sex.value} />
			</div>
			<div class='sheet-card-item'>
				<span>Skin:</span> 
				<input type='text' class='sheet-value' bind:value={$character.desc.skin.value} />
			</div>
			<div class='sheet-card-item'>
				<span>Hair:</span> 
				<input type='text' class='sheet-value' bind:value={$character.desc.hair.value} />
			</div>
		</div>
	</div>
</details>


<style>
	.name-block {
		align-items: center;
		display: flex;
		margin: 0 var(--s100);
		padding-bottom: 0;
	}
	.sheet-card-block {
		width: 50%;
	}
	.sheet-card-item {
		margin-bottom: var(--s50);
		text-align: right;
	}
	.sheet-value-long {
		width: 100%;
	}
	.sheet-value {
		width: 70%;
	}
</style>