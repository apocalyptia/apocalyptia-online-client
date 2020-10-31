import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const BrowningABolt = new Gear({
	id: `dc61759b-4432-456b-91c5-981c3b34fc65`,
	name: `Browning A-Bolt Rifle`,
	sz: 4,
	attr: [
		TwoHanded,
	]
})
BrowningABolt.dmg = 3
BrowningABolt.rng = 60
BrowningABolt.cap = 5
BrowningABolt.cal = `5.56`

export default BrowningABolt