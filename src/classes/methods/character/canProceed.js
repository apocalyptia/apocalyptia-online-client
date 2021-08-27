export default function(step) {
	switch (step) {
		case 0:
			this.proceed = true
			return this.remainingTraits() === 0
		case 1:
			this.proceed = true
			return this.remainingSkills() === 0
		case 3:
			this.proceed = true
			return this.properties.experience.current >= 0
		case 4:
			this.proceed = true
			return Object.values(this.gear).every((g) => g.inventory.length)
		case 5:
			this.proceed = true
			return Object.values(this.description).every((d) => d.value)
		default:
			this.proceed = true
			return true
	}
}