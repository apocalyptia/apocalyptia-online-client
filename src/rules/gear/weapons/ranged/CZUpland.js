import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'
import Rapid from 'rules/gear/attributes/Rapid.js'
import Scatter from 'rules/gear/attributes/Scatter.js'

const CZUpland = new Gear({
	name: `CZ Upland Shotgun`,
	type: `Ranged Weapon`,
	sz: 4,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	]
})
CZUpland.dmg = 5
CZUpland.rng = 20
CZUpland.cap = 2
CZUpland.cal = `12g`

export default CZUpland