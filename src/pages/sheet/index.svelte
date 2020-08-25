<script>
	import CharacterSheet from '../../components/views/sheet/CharacterSheet.svelte'
	import NavBar from '../../components/views/controls/NavBar.svelte'
</script>


<svelte:head>
	<title>Apocalyptia Online Character Sheet</title>
</svelte:head>
<CharacterSheet />
<NavBar links={{back: '/', next: '/'}}/>