import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Auto from '/src/rules/gear/attributes/Auto.js'
import Rapid from '/src/rules/gear/attributes/Rapid.js'

const HKMP5 = new Gear({
	id: ``,
	name: `H&K MP5 SMG`,
	type: `Ranged Weapon`,
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