<script>
import * as sapper from '@sapper/app'
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
			<button on:click={()=>sapper.goto(`/signup`)}>
				Signup
			</button>
			<button on:click={()=>sapper.goto(`/login`)}>
				Login
			</button>
		</div>
	</div>
{/if}


<style>
@media only screen and (max-width: 900px) {
	button {
		display: block;
		margin: auto;
		margin-bottom: var(--s100);
		width: 60%;
	}
}
@media only screen and (min-width: 900px) {
	.button-row {
		display: flex;
		justify-content: space-around;
	}
	button {
		width: 40%;
	}
}
</style>