export default function(character) {
	switch (this.step) {
		case 0:
			this.proceed = character.remainingTraits() === 0
			break
		case 1:
			this.proceed = character.remainingSkills() === 0
			break
		case 3:
			this.proceed = character.properties.experience.current >= 0
			break
		case 4:
			this.proceed = Object.values(character.gear).every((g) => g.inventory.length)
			break
		case 5:
			this.proceed = Object.values(character.description).every((d) => d.value)
			break
		default:
			this.proceed = true
			break
	}
}