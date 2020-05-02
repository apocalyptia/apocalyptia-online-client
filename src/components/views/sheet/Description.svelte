<script>
export let character
</script>


<details class='sheet-card'>
	<summary class='sheet-card-title'>
		Description
	</summary>
	<div class='sheet-card-body'>
		<div class='sheet-card-block'>
			<div class='sheet-card-item'>
				Character: {$character.desc.identity.value}
			</div>
			<div class='sheet-card-item'>
				Age: {$character.desc.age.value}
			</div>
			<div class='sheet-card-item'>
				Height: {$character.desc.height.value}
			</div>
			<div class='sheet-card-item'>
				Weight: {$character.desc.weight.value}
			</div>
		</div>
		<div class='section-block'>
			<div class='sheet-card-item'>
				Sex: {$character.desc.sex.value}
			</div>
			<div class='sheet-card-item'>
				Skin: {$character.desc.skin.value}
			</div>
			<div class='sheet-card-item'>
				Hair: {$character.desc.hair.value}
			</div>
		</div>
	</div>
</details>