import Projectile from '/src/classes/gear/Projectile.js'
import TwoHanded from '../attributes/TwoHanded.js'

const HenryGoldenBoy = new Projectile({
	name: `Henry Golden Boy Rifle`,
	type: `Projectile Weapon`,
	sz: 3,
	attr: [TwoHanded]
})
HenryGoldenBoy.dmg = 0
HenryGoldenBoy.rng = 30
HenryGoldenBoy.cap = 16
HenryGoldenBoy.cal = `.22LR`

export default HenryGoldenBoy
