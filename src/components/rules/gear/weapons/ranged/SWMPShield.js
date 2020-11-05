import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const SWMPShield = new Gear({
	name: `S&W M&P Shield Pistol`,
	sz: 1,
	attr: [
		TwoHanded,
	]
})
SWMPShield.dmg = 1
SWMPShield.rng = 5
SWMPShield.cap = 6
SWMPShield.cal = `9mm`

export default SWMPShield