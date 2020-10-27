import Gear from 'gear/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Blunt from 'attributes/Blunt.js'

const BrassKnuckles = new Gear({
	id: `eaf2a5df-a818-4ec7-bace-25a303895fd8`,
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