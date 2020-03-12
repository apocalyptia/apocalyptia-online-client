<script>
import { character } from '../../../stores/characterStore'
</script>


<div class='center-card'>
	{#if $character.completed}
		<a href='/sheet' class='link-button'>
			Character Sheet
		</a>
	{/if}
	<a href='/creator' class='link-button'>
		Character Creator
	</a>
	<a href='/reference' class='link-button'>
		Rules Reference
	</a>
</div>


<style>
	.link-button {
		margin: var(--s300);
	}
</style>