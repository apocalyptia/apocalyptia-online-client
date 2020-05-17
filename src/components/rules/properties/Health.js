import Property from './Property'


const Health = new Property({
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
				h.current = c.traits.constitution.score * 2
			}
			else {
				h.score = c.traits.constitution.score
				h.current = c.traits.constitution.score
			}
		})
	}
})

export default Health