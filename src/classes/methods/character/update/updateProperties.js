import runFormula from '/src/utils/runFormula.js'
import Properties from '/src/rules/Properties.js'

export default function() {
	for (const p in this.properties) {
		if (p === 'health') {
			for (const l of Object.keys(this.properties[p].locations)) {
				this.properties.health.locations[l].score = runFormula(
					this,
					'traits',
					Properties.health.locations[l].formula
				)
				this.properties.health.locations[l].current = this.properties.health.locations[l].score
			}
		} else {
			this.properties[p].score = runFormula(this, 'traits', Properties[p].formula)
			this.properties[p].current = this.properties[p].score
		}
	}
	this.properties.experience.current = this.properties.experience.score
	if (this.abilities.length) {
		for (const a of this.abilities) {
			this.properties.experience.current -= (a.experience * a.quantity)
		}
	}
}