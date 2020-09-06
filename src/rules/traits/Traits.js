import Agility from './Agility'
import Brains from './Brains'
import Constitution from './Constitution'
import Demeanor from './Demeanor'
import RandomRoll from '../../helpers/random/RandomRoll'


export const traitMax = 6

export const traitPoints = 14

export default {
	name: `Traits`,
	explanation: [
		`You get ${traitPoints} Trait points to assign.`,
		`Traits range from 1 to ${traitMax}.`,
		`Trait rolls are [d6 + Trait].`,
		`Trait scores set the limit for their Skills.`,
	],
	list: [
		Agility,
		Brains,
		Constitution,
		Demeanor,
	],
	max: traitMax,
	startingPoints: () => traitPoints,
	assign: function(c, target) {
		c.traits[target.name].score = parseInt(target.value)
		return this.limit(c, target.name)
	},
	limit: function(c, targetName) {
		while(this.remaining(c) < 0) c.traits[targetName].score--
		return c
	},
	random: function(c) {
		c = this.reset(c)
		while(this.remaining(c) > 0) {
			const t = RandomRoll(Object.keys(c.traits))
			if (c.traits[t].score < this.max) c.traits[t].score++
		}
		return c
	},
	remaining: function(c) {
		const spent = Object.values(c.traits).reduce((t, { score }) => t += score, 0)
		return this.startingPoints() - spent
	},
	reset: function(c) {
		Object.keys(c.traits).forEach(t => c.traits[t].score = 1)
		return c
	}
}