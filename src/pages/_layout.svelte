<script>
	import TitleBar from 'src/components/views/controls/TitleBar.svelte'
	import DisplayWindow from 'src/components/views/ui/DisplayWindow.svelte'
	import version from '../main'
</script>


<main>
	<TitleBar {version}/>
	<DisplayWindow>
		<slot/>
	</DisplayWindow>
</main>