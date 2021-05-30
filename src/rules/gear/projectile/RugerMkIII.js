import Gear from '../../../classes/Gear.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Rapid from '../attributes/Rapid.js'

const RugerMkIII = new Gear({
	name: `Ruger Mk.III Pistol`,
	type: `Projectile Weapon`,
	sz: 1,
	attr: [TwoHanded, Rapid]
})
RugerMkIII.dmg = 1
RugerMkIII.rng = 15
RugerMkIII.cap = 10
RugerMkIII.cal = `.22`

export default RugerMkIII
