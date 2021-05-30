import Gear from '../../../classes/Gear.js'
import TwoHanded from '../attributes/TwoHanded.js'

const ColtPython = new Gear({
	name: `Colt Python Revolver`,
	type: `Projectile Weapon`,
	sz: 1,
	attr: [TwoHanded]
})
ColtPython.dmg = 2
ColtPython.rng = 10
ColtPython.cap = 6
ColtPython.cal = `.357`

export default ColtPython
