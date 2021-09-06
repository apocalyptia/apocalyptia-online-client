export default function() {
	if (this.meta.step === 1) {
		this.meta.proceed = this.meta.traitsRemaining === 0
	} else if (this.meta.step === 2) {
		this.meta.proceed = this.meta.skillsRemaining === 0
	} else if (this.meta.step === 4) {
		this.meta.proceed = this.properties.experience.current >= 0
	} else if (this.meta.step === 5) {
		this.meta.proceed = Object.values(this.gear).every((g) => g.inventory.length)
	} else if (this.meta.step === 6) {
		this.meta.proceed = Object.values(this.description).every((d) => d.value)
	} else {
		this.meta.proceed = true
	}
	return this
}