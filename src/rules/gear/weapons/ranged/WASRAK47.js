import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'
import Rapid from 'rules/gear/attributes/Rapid.js'

const WASRAK47 = new Gear({
	id: ``,
	name: `WASR AK-47 Rifle`,
	type: `Ranged Weapon`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
	]
})
WASRAK47.dmg = 4
WASRAK47.rng = 30
WASRAK47.cap = 30
WASRAK47.cal = `7.62`

export default WASRAK47