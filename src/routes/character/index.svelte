<script>
    import BackButton from 'views/icons/BackButton.svelte'
    import { playerStore } from 'stores/playerStore.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Character</title>
</svelte:head>
<div class='cntr-card'>
    {#if $playerStore.currentCharacter}
        <a href='character/sheet' class='link-btn'>Character Sheet</a>
    {/if}
	<a href='character/new' class='link-btn'>New Character</a>
	<a href='character/load' class='link-btn'>Load Character</a>
</div>
<BackButton path={'/'} />