<script>
    import NavBar from './_navbar.svelte'
</script>


<div class='creator-page'>
    <slot />
</div>
<NavBar />


<style>
    .creator-page {
        padding: var(--s100);
        padding-bottom: var(--s400);
    }
</style>