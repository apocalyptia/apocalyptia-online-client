import Gear from '$classes/Gear.js'
import Blunt from '$rules/gear/attributes/Blunt.js'
import Shield from '$rules/gear/attributes/Shield.js'

const Kite = new Gear({
	id: ``,
	name: `Kite Shield`,
	type: `Melee Weapon`,
	sz: 4,
	attr: [
		Blunt,
		Shield,
	]
})
Kite.dmg = 0
Kite.rng = 1

export default Kite