<script>
    import GearBlock from 'views/widgets/GearBlock.svelte'
    import RandomRoll from 'random/RandomRoll.js'

    export let category

    let item = ''

    const randomItem = _ => item = RandomRoll(category.list)
</script>


<div class='item-category'>
    <h1>{category.name}</h1>
    <div class='item-content'>
        {#if item}
            <GearBlock {item} mode={'manual'}/>
        {/if}
    </div>
    <div class='btn-row'>
        <button on:click={_ => randomItem()}>
            Random
        </button>
    </div>
</div>


<style>
	.item-category {
		border: var(--std-border) var(--pri-color) solid;
		padding: var(--std-padding);
		margin: var(--std-margin) 0;
	}
	h1 {
		margin: auto;
	}
	.item-content {
		margin: var(--std-margin) 0;
	}
</style>