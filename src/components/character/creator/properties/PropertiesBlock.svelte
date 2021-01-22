<script>
    import characterStore from '$stores/characterStore.js'
</script>


<div class='section-card properties-list'>
	<div class='prop-block'>
		<div class='prop-item'>
			{$characterStore.properties.speed.name}: 
			{$characterStore.properties.speed.score}
		</div>
		<div class='prop-item'>
			{$characterStore.properties.xp.name}: 
			{$characterStore.properties.xp.score}
		</div>
		<div class='prop-item'>
			{$characterStore.properties.carry.name}:
			{$characterStore.properties.carry.score}
		</div>
		<div class='prop-item'>
			{$characterStore.properties.psyche.name}: 
			{$characterStore.properties.psyche.score}
		</div>
	</div>
	<div class='prop-block'>
		<div class='prop-item'>
			{$characterStore.properties.dodge.name}: 
			{$characterStore.properties.dodge.score}
		</div>
		<div class='prop-item'>
			{$characterStore.properties.intellect.name}: 
			{$characterStore.properties.intellect.score}
		</div>
		<div class='prop-item'>
			{$characterStore.properties.block.name}: 
			{$characterStore.properties.block.score}
		</div>
		<div class='prop-item'>
			{$characterStore.properties.luck.name}: 
			{$characterStore.properties.luck.score}
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
		align-items: space-between;
		display: flex;
		flex-direction: column;
		height: calc(var(--s100) * 8);
		justify-content: space-between;
		width: 50%;
	}
</style>