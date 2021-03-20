<script>
    import BackButton from '/src/components/buttons/BackButton.svelte'
    import playerStore from '/src/stores/playerStore.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Character</title>
</svelte:head>
<div class='cntr-card'>
    {#if $playerStore.currentCharacter}
        <a href='/sheet' class='link-btn'>Character Sheet</a>
    {:else}
		<a href='/new' class='link-btn'>New Character</a>
		<a href='/load' class='link-btn'>Load Character</a>
	{/if}
</div>
<BackButton path={'/'} />