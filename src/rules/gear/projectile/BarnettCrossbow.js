import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'

const BarnettCrossbow = new Projectile({
	name: `Barnett Crossbow`,
	type: `Projectile Weapon`,
	sz: 3,
	attr: [TwoHanded]
})
BarnettCrossbow.dmg = 3
BarnettCrossbow.rng = 15
BarnettCrossbow.cap = 1
BarnettCrossbow.cal = `Arrow`

export default BarnettCrossbow
