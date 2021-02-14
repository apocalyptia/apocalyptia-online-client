<script>
	import Creation from 'rules/Creation.js'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import RandomAge from 'rules/random/RandomAge.js'
	import RandomDescription from 'rules/random/RandomDescription.js'
	import RandomHair from 'rules/random/RandomHair.js'
	import RandomHeight from 'rules/random/RandomHeight.js'
	import RandomName from 'rules/random/RandomName.js'
	import RandomSex from 'rules/random/RandomSex.js'
	import RandomSkin from 'rules/random/RandomSkin.js'
	import RandomWeight from 'rules/random/RandomWeight.js'
	import ResetAndRandomButtonRow from 'components/character/creator/ResetAndRandomButtonRow.svelte'
	import characterStore from 'stores/characterStore.js'
</script>


<div class='description-step-page'>
	<PageHeader chapter={'Description'} step={$characterStore.meta.step} />
	<div class='section-card'>
		<div class='block-row'>
			<div class='character-container'>
				<span>Name:</span>
				<input type='text' bind:value={$characterStore.description.name.value}>
				<button on:click={_ => $characterStore.description.name.value = RandomName($characterStore)}>Random</button>
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Age:</span>
				<input type='text' bind:value={$characterStore.description.age.value}>
				<button on:click={_ => $characterStore.description.age.value = RandomAge()}>Random</button>
			</div>
			<div class='item-container'>
				<span>Sex:</span>
				<input type='text' bind:value={$characterStore.description.sex.value}>
				<button on:click={_ => $characterStore.description.sex.value = RandomSex()}>Random</button>
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Height:</span>
				<input type='text' bind:value={$characterStore.description.height.value}>
				<button on:click={_ => $characterStore.description.height.value = RandomHeight($characterStore)}>Random</button>
			</div>
			<div class='item-container'>
				<span>Weight:</span>
				<input type='text' bind:value={$characterStore.description.weight.value}>
				<button on:click={_ => $characterStore.description.weight.value = RandomWeight($characterStore)}>Random</button>
			</div>
		</div>
		<div class='block-row'>
			<div class='item-container'>
				<span>Skin:</span>
				<input type='text' bind:value={$characterStore.description.skin.value}>
				<button on:click={_ => $characterStore.description.skin.value = RandomSkin()}>Random</button>
			</div>
			<div class='item-container'>
				<span>Hair:</span>
				<input type='text' bind:value={$characterStore.description.hair.value}>
				<button on:click={_ => $characterStore.description.hair.value = RandomHair($characterStore)}>Random</button>
			</div>
		</div>
	</div>
	<ResetAndRandomButtonRow
		reset={_ => $characterStore = Creation.resetDescription($characterStore)}
		random={_ => $characterStore = RandomDescription($characterStore)}
	/>
</div>


<style>
	div[class*='-container'] {
		align-items: center;
		display: flex;
		justify-content: space-evenly;
		max-width: 100%;
	}
	div[class*='-container'] > span {
		text-align: right;
	}
	div[class*='-container'] > span,
	.character-container > button,
	.item-container > button {
		flex: 1;
	}
	div[class*='-container'] > input {
		margin-left: var(--s33);
		margin-right: var(--s33);
	}
	.block-row {
		display: block;
		width: 100%;
		max-width: 100%;
	}
	div[class*='-container'] {
		margin: var(--s50) 0;
		width: 100%;
	}
	.character-container > input[type='text'],
	.item-container input[type='text'] {
		flex: 1;
	}
</style>