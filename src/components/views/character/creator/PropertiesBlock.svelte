<script>
    import { character } from 'stores/characterStore.js'
</script>


<div class='section-card properties-list'>
	<div class='prop-block'>
		<div class='prop-item'>
			{$character.properties.speed.name}: 
			{$character.properties.speed.score}
		</div>
		<div class='prop-item'>
			{$character.properties.xp.name}: 
			{$character.properties.xp.score}
		</div>
		<div class='prop-item'>
			{$character.properties.carry.name}:
			{$character.properties.carry.score}
		</div>
		<div class='prop-item'>
			{$character.properties.psyche.name}: 
			{$character.properties.psyche.score}
		</div>
	</div>
	<div class='prop-block'>
		<div class='prop-item'>
			{$character.properties.dodge.name}: 
			{$character.properties.dodge.score}
		</div>
		<div class='prop-item'>
			{$character.properties.intellect.name}: 
			{$character.properties.intellect.score}
		</div>
		<div class='prop-item'>
			{$character.properties.block.name}: 
			{$character.properties.block.score}
		</div>
		<div class='prop-item'>
			{$character.properties.luck.name}: 
			{$character.properties.luck.score}
		</div>
	</div>
</div>


<style>
    .properties-list {
		display: flex;
		justify-content: space-between;
		text-align: left;
	}
	.prop-block {
		display: flex;
		flex-direction: column;
		align-items: space-between;
		justify-content: space-between;
		height: calc(var(--s100) * 8);
		width: 50%;
	}
</style>