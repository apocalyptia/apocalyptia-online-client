import Melee from '/src/classes/gear/Melee.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Blunt from '../attributes/Blunt.js'

const Staff = new Melee({
	name: `Staff`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [TwoHanded, Blunt]
})
Staff.dmg = 2
Staff.rng = 3

export default Staff
