<script>
import * as sapper from '@sapper/app'
import { character } from '../../../stores/characterStore'
</script>


<div class='center-card'>
	{#if $character.completed}
		<button on:click={()=>sapper.goto('/sheet')}>
			Character Sheet
		</button>
	{/if}
	<button on:click={()=>sapper.goto('/creator')}>
		Character Creator
	</button>
	<button on:click={()=>sapper.goto('/reference')}>
		Rules Reference
	</button>
	<!-- <button class='display-button'>
		Narrator Section
	</button> -->
</div>