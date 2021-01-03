import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'

const BrowningABolt = new Gear({
	name: `Browning A-Bolt Rifle`,
	type: `Ranged Weapon`,
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