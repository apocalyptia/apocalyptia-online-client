import Gear from '/src/classes/Gear.js'
import TwoHanded from '/src/rules/gear/attributes/TwoHanded.js'

const ColtPython = new Gear({
	id: ``,
	name: `Colt Python Revolver`,
	type: `Ranged Weapon`,
	sz: 1,
	attr: [
		TwoHanded,
	]
})
ColtPython.dmg = 2
ColtPython.rng = 10
ColtPython.cap = 6
ColtPython.cal = `.357`

export default ColtPython