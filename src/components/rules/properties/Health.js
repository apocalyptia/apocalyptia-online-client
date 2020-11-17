import Rule from 'classes/Rule.js'

const Health = new Rule({
	name: `Health`,
	desc: [
		`Head, Arm, and Leg Health = Constitution`,
		`Torso Health = Constitution x 2`,
		`Health is a measure of how much Damage you can withstand.`,
	],
	formula: (c) => {
		Object.values(c.health).forEach((h) => {
			if (h.name == `Torso`) {
				h.score = c.traits.constitution.score * 2
				if (h.current == null) {
					h.current = c.traits.constitution.score * 2
				}
			}
			else {
				h.score = c.traits.constitution.score
				if (h.current == null) {
					h.current = c.traits.constitution.score
				}
			}
		})
	},
	type: `Property`
})

export default Health