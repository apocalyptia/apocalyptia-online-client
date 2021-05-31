import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Rapid from '../attributes/Rapid.js'

const ArmaliteAR15 = new Projectile({
	name: `Armalite AR-15 Rifle`,
	type: `Projectile Weapon`,
	sz: 3,
	attr: [TwoHanded, Rapid]
})
ArmaliteAR15.dmg = 3
ArmaliteAR15.rng = 50
ArmaliteAR15.cap = 30
ArmaliteAR15.cal = `5.56`

export default ArmaliteAR15
