<script>
	import { router } from '../routes'

	let prevScrollpos = window.pageYOffset;
	window.onscroll = () => {
		let currentScrollPos = window.pageYOffset;
		if (prevScrollpos > currentScrollPos) document.getElementById('title-bar').style.top = `0`
		else document.getElementById("title-bar").style.top = `-3rem`
		prevScrollpos = currentScrollPos;
	} 
</script>

<button id='title-bar' class='title-bar' on:click={router.Home}>
	<span class='title'>Apocalyptia Online</span>
	<span class='beta'>beta</span>
</button>

<style>
	.title-bar {
		height: 3rem;
		margin-bottom: 1rem;
		position: fixed;
		text-align: center;
		top: 0;
		transition: top 0.3s;
		width: 100vw;
		z-index: 1;
	}
	.title {
		font-size: 1.5rem;
	}
	.beta {
		color: lightcoral;
		border: 1px dotted lightcoral;
		font-size: .75rem;
		padding: .25rem;
	}
</style>