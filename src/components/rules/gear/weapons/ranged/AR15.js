import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'

const AR15 = new Gear({
	id: `69cd0033-60ad-4d4c-aac2-d9584e5766a1`,
	name: `AR-15`,
	sz: 3,
	attr: [
		TwoHanded,
		Rapid,
	]
})
AR15.dmg = 2
AR15.rng = 30
AR15.cap = 30
AR15.cal = `5.56`

export default AR15