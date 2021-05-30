import Gear from '../../../classes/Gear.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Rapid from '../attributes/Rapid.js'

const SpringfieldM1A = new Gear({
	name: `Springfield M1A Rifle`,
	type: `Projectile Weapon`,
	sz: 4,
	attr: [TwoHanded, Rapid]
})
SpringfieldM1A.dmg = 6
SpringfieldM1A.rng = 80
SpringfieldM1A.cap = 20
SpringfieldM1A.cal = `.308`

export default SpringfieldM1A
