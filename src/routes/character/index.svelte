<script>
	import playerStore from '/src/stores/playerStore.js'
</script>

<svelte:head>
	<title>Apocalyptia Online - Character</title>
</svelte:head>
<div class="cntr-card">
	{#if $playerStore.selectedCharacter}
        <a href='/character/sheet' class='link-btn'>Character Sheet</a>
    {/if}
	<a href="/character/new" class="link-btn">New Character</a>
	<a href="/character/manager" class="link-btn">Character Manager</a>
</div>
