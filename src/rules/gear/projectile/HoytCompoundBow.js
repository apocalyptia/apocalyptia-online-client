import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'

const HoytCompoundBow = new Projectile({
	name: `Hoyt Compound Bow`,
	type: `Projectile Weapon`,
	sz: 3,
	attr: [TwoHanded]
})
HoytCompoundBow.dmg = 2
HoytCompoundBow.rng = 15
HoytCompoundBow.cap = 1
HoytCompoundBow.cal = `Arrow`

export default HoytCompoundBow
