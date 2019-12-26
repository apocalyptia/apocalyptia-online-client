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

    const change = (ch) => {
        chap = ch
        console.log(chap)
    }
</script>

{#each chapters as chapter}
    <button class='diplay-button' on:click|preventDefault={() => change(chapter)}>{chapter}</button>
{/each}