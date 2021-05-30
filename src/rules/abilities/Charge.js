import Ability from '../../classes/Ability.js'

const Charge = new Ability({
	name: `Charge`,
	desc: [`Ignore Unstable penalty to Melee Attacks when you Run.`, `Ignore Prone effect from Leg Damage.`],
	max: 1,
	experience: 15
})

export default Charge
