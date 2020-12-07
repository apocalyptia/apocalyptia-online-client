import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Auto from 'attributes/Auto.js'
import Rapid from 'attributes/Rapid.js'

const MAC10 = new Gear({
	name: `MAC-10 SMG`,
	type: `Ranged Weapon`,
	sz: 2,
	attr: [
		TwoHanded,
		Auto,
		Rapid,
	]
})
MAC10.dmg = 1
MAC10.rng = 20
MAC10.cap = 30
MAC10.cal = `.45`

export default MAC10