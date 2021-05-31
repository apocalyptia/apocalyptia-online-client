import Melee from '/src/classes/gear/Melee.js'
import OneHanded from '../attributes/OneHanded.js'
import Chop from '../attributes/Chop.js'

const Hatchet = new Melee({
	name: `Hatchet`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [OneHanded, Chop]
})
Hatchet.dmg = 2
Hatchet.rng = 1

export default Hatchet
