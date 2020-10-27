import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const CompoundBow = new Gear({
	id: `8c4ba934-2850-4025-a9bf-188cc08a1c9c`,
	name: `Compound Bow`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
CompoundBow.dmg = 1
CompoundBow.rng = 15
CompoundBow.cap = 1
CompoundBow.cal = `Arrow`

export default CompoundBow