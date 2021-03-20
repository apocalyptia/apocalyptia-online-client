import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'

const SavageMkII = new Gear({
	id: ``,
	name: `Savage Mk.II Rifle`,
	type: `Ranged Weapon`,
	sz: 3,
	attr: [
		TwoHanded,
	]
})
SavageMkII.dmg = 1
SavageMkII.rng = 40
SavageMkII.cap = 10
SavageMkII.cal = `.22`

export default SavageMkII