<script>
	import { fade } from 'svelte/transition'
	import { character } from '../../stores'

	const props = Object.keys($character.props)
</script>

<div class='properties-step' in:fade>
	<div class='step-title'>
		<h2>Properties</h2>
	</div>
	<div class='props-list'>
		<div class='prop-col'>
			<span class='left-col'>
				<div class='prop-item'>
					{$character.props.health.name}: {$character.props.health.score}
				</div>
				<div class='prop-item'>
					{$character.props.init.name}: {$character.props.init.score}
				</div>
				<div class='prop-item'>
					{$character.props.speed.name}: {$character.props.speed.score}
				</div>
			</span>
			<span class='right-col'>
				<div class='prop-item'>
					{$character.props.psyche.name}: {$character.props.psyche.score}
				</div>
				<div class='prop-item'>
					{$character.props.luck.name}: {$character.props.luck.score}
				</div>
				<div class='prop-item'>
					{$character.props.xp.name}: {$character.props.xp.score}
				</div>
			</span>
		</div>
		<div class='def-list'>
			<div class='def-header'>Defenses</div>
			<div class='prop-item'>
				{$character.props.block.name}: {$character.props.block.score}
			</div>
			<div class='prop-item'>
				{$character.props.dodge.name}: {$character.props.dodge.score}
			</div>
			<div class='prop-item'>
				{$character.props.reflex.name}: {$character.props.reflex.score}
			</div>
		</div>
	</div>
</div>

<style>
	.props-list {
		display: flex;
		flex-direction: column;
		text-align: left;
	}
	.def-list {
		border: 1px solid lime;
		margin: .5rem;
		padding: .5rem;
		text-align: center;
	}
	.def-list .prop-item {
		display: inline-block;
	}
	@media (max-width: 500px) {
		.def-list .prop-item {
			display: block;
		}
	}
	.def-header {
		font-size: 1.25rem;
		margin-top: 1rem;
	}
	.prop-col {
		border: 1px solid lime;
		margin: .5rem;
		padding: .5rem;
	}
	.left-col {
		float: left;
	}
	.right-col {
		float: right;
	}
	.prop-item {
		margin: 1rem;
	}
</style>