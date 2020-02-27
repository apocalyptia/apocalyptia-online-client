<script>
import * as sapper from '@sapper/app'
import { onMount } from 'svelte'
import { typewriter } from '../../functions/Typewriter'

let show = false

onMount(() => show = true)
</script>


{#if show}
	<div class='center-card'>
		<div class='title-row' in:typewriter>
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
@media only screen and (max-width: 768px) {
	button {
		display: block;
		margin: auto;
		margin-bottom: var(--base-unit);
		width: 60%;
	}
}
@media only screen and (min-width: 768px) {
	.button-row {
		display: flex;
		justify-content: space-around;
	}
	button {
		width: 40%;
	}
}
</style>