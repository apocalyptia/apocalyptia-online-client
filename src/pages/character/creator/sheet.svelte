<script>
	import CharacterSheet from '../../../views/character/CharacterSheet.svelte'
	import NavBar from '../../../views/widgets/NavBar.svelte'
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Character Sheet</title>
</svelte:head>
<CharacterSheet readonly={true} />
<NavBar links={{back: '/character/creator/gear', next: '/'}}/>