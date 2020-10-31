import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'

const WASRAK47 = new Gear({
	id: `027eaaee-2580-47a8-8dcc-40e9905b0f17`,
	name: `WASR AK-47 Rifle`,
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