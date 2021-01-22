import Gear from '$classes/Gear.js'
import OneHanded from '$rules/gear/attributes/OneHanded.js'
import Blunt from '$rules/gear/attributes/Blunt.js'

const Hammer = new Gear({
	id: ``,
	name: `Hammer`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		OneHanded,
		Blunt,
	]
})
Hammer.dmg = 2
Hammer.rng = 1

export default Hammer