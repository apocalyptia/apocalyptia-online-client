import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'
import Rapid from '/src/rules/gear/attributes/Rapid.js'

const SWMPShield = new Gear({
	id: ``,
	name: `S&W M&P Shield Pistol`,
	type: `Ranged Weapon`,
	sz: 1,
	attr: [
		TwoHanded,
		Rapid
	]
})
SWMPShield.dmg = 1
SWMPShield.rng = 5
SWMPShield.cap = 7
SWMPShield.cal = `9mm`

export default SWMPShield