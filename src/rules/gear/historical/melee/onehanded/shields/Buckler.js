import Gear from '$classes/Gear.js'
import Blunt from '$rules/gear/attributes/Blunt.js'
import Shield from '$rules/gear/attributes/Shield.js'

const Buckler = new Gear({
	id: ``,
	name: `Buckler Shield`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		Blunt,
		Shield,
	]
})
Buckler.dmg = 0
Buckler.rng = 1

export default Buckler