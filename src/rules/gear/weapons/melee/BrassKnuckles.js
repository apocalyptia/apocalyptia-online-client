import Gear from '/src/classes/Gear.js'
import OneHanded from '/src/rules/gear/attributes/OneHanded.js'
import Blunt from '/src/rules/gear/attributes/Blunt.js'

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