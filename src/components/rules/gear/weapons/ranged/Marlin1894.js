import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'

const Marlin1894 = new Gear({
	id: `19c418dd-d00d-4a43-bc71-7c373d8aefe9`,
	name: `Marlin 1894 Rifle`,
	sz: 3,
	dmg: 2,
	rng: 30,
	attr: [
		TwoHanded,
	],
	cap: 9,
	cal: `.357`
})
Marlin1894.dmg = 2
Marlin1894.rng = 30
Marlin1894.cap = 9
Marlin1894.cal = `.357`

export default Marlin1894