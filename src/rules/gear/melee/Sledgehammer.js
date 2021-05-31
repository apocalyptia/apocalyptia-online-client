import Melee from '/src/classes/gear/Melee.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Blunt from '../attributes/Blunt.js'
import Slow from '../attributes/Slow.js'

const Sledgehammer = new Melee({
	name: `Sledgehammer`,
	type: `Melee Weapon`,
	sz: 5,
	attr: [TwoHanded, Blunt, Slow]
})
Sledgehammer.dmg = 4
Sledgehammer.rng = 2

export default Sledgehammer
