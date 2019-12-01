<script>
    import router from '../routes'
</script>

<button class='title-bar' on:click={router.Home}>
    <span class='title'>Apocalyptia Online</span>
    <span class='beta'>beta</span>
</button>

<style>
    .title-bar {
        height: 50px;
        position: fixed;
        text-align: center;
        top: 0;
        width: 100vw;
        z-index: 1;
    }
    .title {
        font-size: 2rem;
    }
    .beta {
        color: lightcoral;
        border: 1px dotted lightcoral;
        padding: 3px;
    }
</style>