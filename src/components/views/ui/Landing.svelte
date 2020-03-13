<script>
import Typewriter from '../../functions/Typewriter'
import { onMount } from 'svelte'

let show = false

onMount(() => show = true)
</script>


{#if show}
	<div class='cntr-card'>
		<div class='title-row' in:Typewriter>
			Connection established...
		</div>
		<div class='btn-row'>
			<a href='/signup' class='link-btn'>
				Signup
			</a>
			<a href='/login' class='link-btn'>
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
	.btn-row {
		display: block;
	}
	.link-btn {
		display: block;
		margin: var(--s100) auto;
		width: 70%;
	}
}
@media only screen and (min-width: 900px) {
	.btn-row {
		display: flex;
		justify-content: space-around;
	}
	.link-btn {
		width: 40%;
	}
}
</style>