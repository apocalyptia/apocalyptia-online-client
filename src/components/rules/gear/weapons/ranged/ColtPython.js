import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const ColtPython = new Gear({
	id: `8c4ba934-2850-4025-a9bf-188cc08a1c9c`,
	name: `Colt Python Revolver`,
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