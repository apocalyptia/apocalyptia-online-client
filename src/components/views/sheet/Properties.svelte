<script>
	import { character } from '../../../stores/characterStore'
</script>


<details class='sheet-card' open>
	<summary class='sheet-card-title'>
		Properties
	</summary>
	<div class='sheet-card-body'>
		<div class='sheet-card-block'>
			<div class='sheet-card-item'>
				{$character.props.speed.name}: 
				{$character.props.speed.score}
			</div>
			<div class='sheet-card-item'>
				{$character.props.carry.name}: 
				{$character.props.carry.current} / 
				{$character.props.carry.score}
			</div>
			<div class='sheet-card-item'>
				XP: 
				{$character.props.experience.remaining} / 
				{$character.props.experience.score}
			</div>
			<div class='sheet-card-item'>
				{$character.props.psyche.name}: 
				{$character.props.psyche.current} / 
				{$character.props.psyche.score}
			</div>
		</div>
		<div class='sheet-card-block'>
			<div class='sheet-card-item'>
				{$character.props.dodge.name}: 
				{$character.props.dodge.score}
			</div>
			<div class='sheet-card-item'>
				{$character.props.block.name}: 
				{$character.props.block.score}
			</div>
			<div class='sheet-card-item'>
				{$character.props.intellect.name}: 
				{$character.props.intellect.score}
			</div>
			<div class='sheet-card-item'>
				{$character.props.luck.name}: 
				{$character.props.luck.current} / 
				{$character.props.luck.score}
			</div>
		</div>
	</div>
</details>