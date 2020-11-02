import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const SWBodyguard = new Gear({
	name: `S&W Bodyguard Revolver`,
	sz: 1,
	attr: [
		TwoHanded,
	]
})
SWBodyguard.dmg = 2
SWBodyguard.rng = 5
SWBodyguard.cap = 5
SWBodyguard.cal = `.357`

export default SWBodyguard