import Gear from 'classes/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Blunt from 'attributes/Blunt.js'

const Staff = new Gear({
	id: `1fab5144-0cd7-440c-93ab-2a9c849941e7`,
	name: `Staff`,
	sz: 3,
	attr: [
		TwoHanded,
		Blunt,
	]
})
Staff.dmg = 2
Staff.rng = 3

export default Staff