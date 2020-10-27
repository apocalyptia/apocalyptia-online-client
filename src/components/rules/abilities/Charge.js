import Ability from 'abilities/Ability.js'

const Charge = new Ability({
	id: `c44580dd-3a0a-41d5-b97f-ec1f9f4bea0d`,
	name: `Charge`,
	desc: [
		`Ignore Unstable penalty to Melee Attacks when you Run.`,
		`Ignore Prone effect from Leg Damage.`,
	],
	max: 1,
	xp: 15
})

export default Charge