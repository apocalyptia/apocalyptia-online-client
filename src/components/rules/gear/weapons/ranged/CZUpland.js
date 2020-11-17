import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'
import Scatter from 'attributes/Scatter.js'

const CZUpland = new Gear({
	name: `CZ Upland Shotgun`,
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