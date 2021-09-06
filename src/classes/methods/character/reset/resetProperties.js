export default function() {
	for (const p in this.properties) {
		if (p === `health`) {
			for (const h in this.health) {
				if (h === `torso`) {
					this.health[h].current = this.traits.constitution.score * 2
					this.health[h].score = this.traits.constitution.score * 2
				} else {
					this.health[h].current = this.traits.constitution.score
					this.health[h].score = this.traits.constitution.score
				}
				this.health[h]
			}
		} else {
			this.properties[p].current = 0
			this.properties[p].score = 0
		}
	}
	this.updateProperties()
	this.resetAbilities()
	return this
}