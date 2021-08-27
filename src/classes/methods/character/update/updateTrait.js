export default function(trait) {
	const traitKey = trait.name.toLowerCase()
	this.traits[traitKey].score = parseInt(trait.score)
	this.remainingTraits()
	while (this.traitsRemaining < 0) {
		this.traits[traitKey].score--
		this.remainingTraits()
	}
	this.resetSkills()
	this.updateProperties()
	this.remainingSkills()
}