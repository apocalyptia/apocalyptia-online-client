<script>
import { character } from '../../../stores/characterStore'
</script>


<div class='cntr-card'>
	{#if $character.completed}
		<a href='/sheet' class='link-btn'>
			Character Sheet
		</a>
	{/if}
	<a href='/creator' class='link-btn'>
		Character Creator
	</a>
	<a href='/reference' class='link-btn'>
		Rules Reference
	</a>
</div>


<style>
	.link-btn {
		margin: var(--s300);
	}
</style>