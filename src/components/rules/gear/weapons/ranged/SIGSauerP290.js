import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const SIGSauerP290 = new Gear({
	name: `SIG Sauer P290 Pistol`,
	sz: 1,
	attr: [
		TwoHanded,
	]
})
SIGSauerP290.dmg = 1
SIGSauerP290.rng = 5
SIGSauerP290.cap = 6
SIGSauerP290.cal = `9mm`

export default SIGSauerP290