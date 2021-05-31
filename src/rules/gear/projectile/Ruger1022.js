import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Rapid from '../attributes/Rapid.js'

const Ruger1022 = new Projectile({
	name: `Ruger 10/22 Rifle`,
	type: `Projectile Weapon`,
	sz: 3,
	attr: [TwoHanded, Rapid]
})
Ruger1022.dmg = 1
Ruger1022.rng = 30
Ruger1022.cap = 10
Ruger1022.cal = `.22LR`

export default Ruger1022
