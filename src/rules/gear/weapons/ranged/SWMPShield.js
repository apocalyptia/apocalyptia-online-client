import Gear from 'classes/Gear.js'
import TwoHanded from 'rules/gear/attributes/TwoHanded.js'

const SWMPShield = new Gear({
	id: ``,
	name: `S&W M&P Shield Pistol`,
	type: `Ranged Weapon`,
	sz: 1,
	attr: [
		TwoHanded,
	]
})
SWMPShield.dmg = 1
SWMPShield.rng = 5
SWMPShield.cap = 7
SWMPShield.cal = `9mm`

export default SWMPShield