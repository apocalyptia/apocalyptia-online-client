import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const SavageMkII = new Gear({
	name: `Savage Mk.II Rifle`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
SavageMkII.dmg = 0
SavageMkII.rng = 40
SavageMkII.cap = 10
SavageMkII.cal = `.22`

export default SavageMkII