import Gear from '$classes/Gear.js'
import Blunt from '$rules/gear/attributes/Blunt.js'
import Shield from '$rules/gear/attributes/Shield.js'

const Round = new Gear({
	id: ``,
	name: `Round Shield`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [
		Blunt,
		Shield,
	]
})
Round.dmg = 0
Round.rng = 1

export default Round