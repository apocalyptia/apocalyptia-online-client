import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const SWBodyguard = new Gear({
	id: `2b58cb89-7b72-42cf-9ec0-d524e5e886a6`,
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