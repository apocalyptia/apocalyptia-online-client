<script>
	import BackButton from 'components/buttons/BackButton.svelte'
	import CharacterSheet from 'components/character/sheet/CharacterSheet.svelte'
	import DeleteCharacter from 'database/characters/DeleteCharacter.js'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import { characterStore } from 'stores/characterStore.js'
	import { onDestroy } from 'svelte'

	onDestroy(_ => SaveCharacter($characterStore))
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Sheet</title>
</svelte:head>
<div class='sheet page-body'>
	<CharacterSheet mode={'edit'} />
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={_ => SaveCharacter($characterStore)}>
			<a href='/'>Save</a>
		</button>
		<button class='small-cntr-btn' on:click={_ => DeleteCharacter($characterStore.meta.name)}>
			<a href='/'>Delete</a>
		</button>
	</div>
</div>
<BackButton path={'character'} />