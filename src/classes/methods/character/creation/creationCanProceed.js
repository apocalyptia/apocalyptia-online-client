export default function() {
	// Traits
	if (this.meta.step === 1) {
		this.meta.proceed = (this.meta.traitsRemaining === 0)
	}
	// Skills
	else if (this.meta.step === 2) {
		this.meta.proceed = (this.meta.skillsRemaining === 0)
	}
	// Properties
	else if (this.meta.step === 3) {
		this.meta.proceed = true
	}
	// Abilities
	else if (this.meta.step === 4) {
		this.meta.proceed = (this.properties.experience.current >= 0)
	}
	// Gear
	else if (this.meta.step === 5) {
		this.meta.proceed = Object.values(this.gear).every((g) => g.inventory.length)
	}
	// Description
	else if (this.meta.step === 6) {
		this.meta.proceed = Object.values(this.description).every((d) => d.value)
	}
	return this
}