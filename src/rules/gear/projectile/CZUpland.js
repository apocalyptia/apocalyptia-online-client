import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Rapid from '../attributes/Rapid.js'
import Scatter from '../attributes/Scatter.js'

const CZUpland = new Projectile({
	name: `CZ Upland Shotgun`,
	type: `Projectile Weapon`,
	sz: 4,
	attr: [TwoHanded, Rapid, Scatter]
})
CZUpland.dmg = 5
CZUpland.rng = 20
CZUpland.cap = 2
CZUpland.cal = `12g`

export default CZUpland
