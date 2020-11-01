import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const SIGSauerP290 = new Gear({
	id: `16cffbd6-54af-49d2-a531-2d950435250b`,
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