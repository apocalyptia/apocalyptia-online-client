<script>
	import TitleBar from '../views/widgets/TitleBar.svelte'
	import DisplayWindow from '../views/widgets/DisplayWindow.svelte'
	import { version } from '../main'
</script>


<main>
	<TitleBar {version}/>
	<DisplayWindow>
		<slot/>
	</DisplayWindow>
</main>