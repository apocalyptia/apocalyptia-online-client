import Property from '../../classes/Property'


const Health = new Property({
	name: `Health`,
	desc: [
		`Head, Arm, Leg Health = Constitution`,
		`Torso Health = Constitution x 2`,
		`Health is a measure of how much Damage you can withstand.`,
		`You fall Unconscious when you have taken total Damage = Constitution x 2.`,
		`You die when Head or Torso Health = 0.`,
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