import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Scatter from '../attributes/Scatter.js'

const Mossberg500 = new Projectile({
	name: `Mossberg 500 Shotgun`,
	type: `Projectile Weapon`,
	sz: 2,
	attr: [TwoHanded, Scatter]
})
Mossberg500.dmg = 5
Mossberg500.rng = 10
Mossberg500.cap = 5
Mossberg500.cal = `12g`

export default Mossberg500
