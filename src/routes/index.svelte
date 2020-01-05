<script>
	import { fade } from 'svelte/transition'
	import Creator from './creator.svelte'
	import Reference from './reference.svelte'
</script>

<svelte:head>
	<title>Apocalyptia Online</title>
</svelte:head>

<div in:fade>
	<a href="/creator">
		<button class='display-button'>
			Character Creator
		</button>
	</a>
	<a href="/reference">
		<button class='display-button'>
			Rules Reference
		</button>
	</a>
</div>