import Gear from 'classes/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Blunt from 'attributes/Blunt.js'

const BrassKnuckles = new Gear({
	name: `Brass Knuckles`,
	sz: 1,
	attr: [
		OneHanded,
		Blunt,
	]
})
BrassKnuckles.dmg = 1
BrassKnuckles.rng = 1

export default BrassKnuckles