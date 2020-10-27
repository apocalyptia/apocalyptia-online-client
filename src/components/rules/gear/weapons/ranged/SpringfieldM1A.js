import Gear from 'gear/Gear.js'
import TwoHanded from 'attributes/TwoHanded.js'
import Rapid from 'attributes/Rapid.js'

const SpringfieldM1A = new Gear({
	id: `ea8867ac-4563-425f-b999-1195cd6f350e`,
	name: `Springfield M1A`,
	sz: 4,
	attr: [
		TwoHanded,
		Rapid,
	]
})
SpringfieldM1A.dmg = 3
SpringfieldM1A.rng = 80
SpringfieldM1A.cap = 20
SpringfieldM1A.cal = `.308`

export default SpringfieldM1A