import Gear from '$classes/Gear.js'
import Blunt from '$rules/gear/attributes/Blunt.js'
import Shield from '$rules/gear/attributes/Shield.js'

const Scutum = new Gear({
	id: ``,
	name: `Buckler Shield`,
	type: `Melee Weapon`,
	sz: 5,
	attr: [
		Blunt,
		Shield,
	]
})
Scutum.dmg = 0
Scutum.rng = 1

export default Scutum