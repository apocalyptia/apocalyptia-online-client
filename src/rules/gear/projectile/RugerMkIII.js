import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Rapid from '../attributes/Rapid.js'

const RugerMkIII = new Projectile({
	name: `Ruger Mk.III Pistol`,
	type: `Projectile Weapon`,
	sz: 1,
	attr: [TwoHanded, Rapid]
})
RugerMkIII.dmg = 1
RugerMkIII.rng = 15
RugerMkIII.cap = 10
RugerMkIII.cal = `.22LR`

export default RugerMkIII
