<script>
    import { fade } from 'svelte/transition'

    let result = 6

    function roll() {
        result = Math.ceil(Math.random()*6)
    }

    function roll_die() {
        for (let i = 0; i < 60000; i++) {
            setTimeout(function() {
                roll()
            }, 50)
        }
    }
</script>

<div class="sheet-section">
    <button class="die" on:click={roll_die}>
        <div class="die_number" transition:fade={{duration: 1000}}>{result}</div>
    </button>
</div>

<style>
    .die {
        margin: 30px auto;
        height: 50px;
        width: 50px;
        border: 4px solid var(--char-color);
        border-radius: 10px;
        text-align: center;
    }
    .die_number {
        font-size: 20pt;
    }
</style>