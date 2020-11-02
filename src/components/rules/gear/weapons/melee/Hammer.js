import Gear from 'classes/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Blunt from 'attributes/Blunt.js'

const Hammer = new Gear({
	name: `Hammer`,
	sz: 2,
	attr: [
		OneHanded,
		Blunt,
	]
})
Hammer.dmg = 2
Hammer.rng = 1

export default Hammer