<script>
    const chapters = [
        `Dice`,
        `Traits`,
        `Skills`,
        `Combat`,
        `Maneuvers`,
        `Situations`,
        `Abilities`,
        `Gear`
    ]

    export let chap = ``

    const change = (ch) => chap = ch
</script>

{#each chapters as chapter}
    <button
        class='display-button'
        on:click|preventDefault={() => change(chapter)}>
            {chapter}
    </button>
{/each}