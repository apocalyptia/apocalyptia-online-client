import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const CompoundBow = new Gear({
	name: `Compound Bow`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
CompoundBow.dmg = 2
CompoundBow.rng = 15
CompoundBow.cap = 1
CompoundBow.cal = `Arrow`

export default CompoundBow