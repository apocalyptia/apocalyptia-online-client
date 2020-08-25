<script>
	import CharacterSheet from '../../components/views/sheet/CharacterSheet.svelte'
	import NavBar from '../../components/views/controls/NavBar.svelte'
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Character Sheet</title>
</svelte:head>
<CharacterSheet readonly={true} />
<NavBar links={{back: '/creator/gear', next: '/'}}/>