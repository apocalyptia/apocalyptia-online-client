import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Auto from 'attributes/Auto.js'
import Rapid from 'attributes/Rapid.js'

const HKMP5 = new Gear({
	id: `e9381665-1e1f-48ff-b07f-80bba3f81773`,
	name: `H&K MP5`,
	sz: 3,
	attr: [
		TwoHanded,
		Auto,
		Rapid,
	]
})
HKMP5.dmg = 1
HKMP5.rng = 20
HKMP5.cap = 30
HKMP5.cal = `9mm`

export default HKMP5