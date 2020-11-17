<script>
    import BackButton from 'views/icons/BackButton.svelte'
    import GoTo from 'utils/GoTo.js'
    import { user } from 'stores/userStore.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Character</title>
</svelte:head>
<div class='cntr-card'>
    {#if $user.currentCharacter}
        <button class='link-btn' on:click={_ => GoTo(`character/sheet`)}>Character Sheet</button>
    {/if}
    <button class='link-btn' on:click={_ => GoTo(`character/new`)}>New Character</button>
    <button class='link-btn' on:click={_ => GoTo(`character/load`)}>Load Character</button>
</div>
<BackButton path={'/'} />