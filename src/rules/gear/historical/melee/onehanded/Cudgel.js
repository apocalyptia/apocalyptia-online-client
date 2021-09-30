import Gear from '$classes/Gear.js'
import OneHanded from '$rules/gear/attributes/OneHanded.js'
import Blunt from '$rules/gear/attributes/Blunt.js'

const Cudgel = new Gear({
	id: ``,
	name: `Cudgel`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		OneHanded,
		Blunt,
	]
})
Cudgel.dmg = 1
Cudgel.rng = 2

export default Cudgel