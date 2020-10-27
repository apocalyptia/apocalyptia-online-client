import Gear from 'gear/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Blunt from 'attributes/Blunt.js'

const Hammer = new Gear({
	id: `76f801f0-72e6-4b92-ab5a-61d8728da9dc`,
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