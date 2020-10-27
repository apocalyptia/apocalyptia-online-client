import Gear from 'gear/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Chop from 'attributes/Chop.js'

const Hatchet = new Gear({
	id: `fcb3667d-44e2-4faf-b404-1aa9e0c0af09`,
	name: `Hatchet`,
	sz: 2,
	attr: [
		OneHanded,
		Chop,
	]
})
Hatchet.dmg = 2
Hatchet.rng = 1

export default Hatchet