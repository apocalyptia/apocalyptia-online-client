<script>
	import TitleBar from '../components/views/controls/TitleBar.svelte'
	import DisplayWindow from '../components/views/ui/DisplayWindow.svelte'
</script>


<main>
	<TitleBar/>
	<DisplayWindow>
		<slot/>
	</DisplayWindow>
</main>