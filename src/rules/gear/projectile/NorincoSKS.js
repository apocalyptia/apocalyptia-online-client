import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'
import Rapid from '../attributes/Rapid.js'

const NorincoSKS = new Projectile({
	name: `Norinco SKS Rifle`,
	type: `Projectile Weapon`,
	sz: 4,
	attr: [TwoHanded, Rapid]
})
NorincoSKS.dmg = 4
NorincoSKS.rng = 50
NorincoSKS.cap = 10
NorincoSKS.cal = `7.62`

export default NorincoSKS
