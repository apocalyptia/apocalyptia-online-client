<script>
    import BackButton from '/src/components/buttons/BackButton.svelte'
    import Character from '/src/classes/Character.js'
	import characterStore from '/src/stores/characterStore.js'
	import creationStore from '/src/stores/creationStore.js'

	const newCharacter = () => {
		$characterStore = new Character()
	}

    const randomCharacter = () => {
		$characterStore = new Character()
		$characterStore.randomCharacter()
    }
</script>


<svelte:head>
	<title>Apocalyptia Online - New Character</title>
</svelte:head>
<div class='cntr-card'>
    <a href='/character/creator' class='link-btn' on:click={newCharacter}>Build</a>
    <a href='/character/sheet' class='link-btn' on:click={randomCharacter}>Random</a>
</div>
<BackButton path={'/character'} />