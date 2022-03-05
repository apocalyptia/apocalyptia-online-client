import randomRoll from '$utils/random/dice/randomRoll.js'

export default function() {
	this.resetTraits()
	while (this.meta.traitsRemaining) {
		const traitName = randomRoll(Object.keys(this.traits))
		if (this.traits[traitName].score < this.meta.maxTraits) {
			this.traits[traitName].score++
		}
		this.remainingTraits()
	}
	for (const trait of Object.values(this.traits)) {
		this.updateTrait(trait)
	}
	return this
}