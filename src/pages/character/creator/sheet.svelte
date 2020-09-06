<script>
	import CharacterSheet from 'src/components/views/character/sheet/CharacterSheet.svelte'
	import NavBar from 'src/components/views/controls/NavBar.svelte'
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Character Sheet</title>
</svelte:head>
<CharacterSheet readonly={true} />
<NavBar links={{back: '/character/creator/gear', next: '/'}}/>