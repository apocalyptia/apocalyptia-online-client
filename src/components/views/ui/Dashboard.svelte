<script>
import * as sapper from '@sapper/app'
</script>


<div class='center-card'>
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