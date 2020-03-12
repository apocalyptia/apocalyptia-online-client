<script>
import Typewriter from '../../functions/Typewriter'
import { onMount } from 'svelte'

let show = false

onMount(() => show = true)
</script>


{#if show}
	<div class='center-card'>
		<div class='title-row' in:Typewriter>
			Connection established...
		</div>
		<div class='button-row'>
			<a href='/signup' class='link-button'>
				Signup
			</a>
			<a href='/login' class='link-button'>
				Login
			</a>
		</div>
	</div>
{/if}


<style>
.title-row {
	margin: var(--s100);
}
@media only screen and (max-width: 900px) {
	.button-row {
		display: block;
	}
	.link-button {
		display: block;
		margin: var(--s100) auto;
		width: 70%;
	}
}
@media only screen and (min-width: 900px) {
	.button-row {
		display: flex;
		justify-content: space-around;
	}
	.link-button {
		width: 40%;
	}
}
</style>