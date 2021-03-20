import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Rapid from '/src/rules/gear/attributes/Rapid.js'
import Scatter from '/src/rules/gear/attributes/Scatter.js'

const CZUpland = new Gear({
	id: ``,
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