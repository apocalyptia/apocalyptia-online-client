import Melee from '/src/classes/gear/Melee.js'
import OneHanded from '../attributes/OneHanded.js'
import Blunt from '../attributes/Blunt.js'

const BrassKnuckles = new Melee({
	name: `Brass Knuckles`,
	type: `Melee Weapon`,
	sz: 1,
	attr: [OneHanded, Blunt]
})
BrassKnuckles.dmg = 1
BrassKnuckles.rng = 1

export default BrassKnuckles
