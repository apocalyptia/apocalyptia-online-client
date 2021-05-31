import Melee from '/src/classes/gear/Melee.js'
import OneHanded from '../attributes/OneHanded.js'
import Blunt from '../attributes/Blunt.js'

const Hammer = new Melee({
	name: `Hammer`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [OneHanded, Blunt]
})
Hammer.dmg = 2
Hammer.rng = 1

export default Hammer
