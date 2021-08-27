import randomRoll from '/src/utils/random/dice/randomRoll.js'

export default function() {
	this.resetTraits()
	while (this.traitsRemaining) {
		const traitName = randomRoll(Object.keys(this.traits))
		if (this.traits[traitName].score < this.maxTraits) {
			this.traits[traitName].score++
		}
		this.remainingTraits()
	}
	for (const trait of Object.values(this.traits)) {
		this.updateTrait(trait)
	}
}