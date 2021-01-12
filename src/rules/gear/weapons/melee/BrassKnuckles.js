import Gear from 'classes/Gear.js'
import OneHanded from 'rules/gear/attributes/OneHanded.js'
import Blunt from 'rules/gear/attributes/Blunt.js'

const BrassKnuckles = new Gear({
	id: ``,
	name: `Brass Knuckles`,
	type: `Melee Weapon`,
	sz: 1,
	attr: [
		OneHanded,
		Blunt,
	]
})
BrassKnuckles.dmg = 1
BrassKnuckles.rng = 1

export default BrassKnuckles