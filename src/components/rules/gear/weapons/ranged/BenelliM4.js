import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Rapid from 'gear/attributes/weapon/Rapid.js'
import Scatter from 'gear/attributes/weapon/Scatter.js'


const BenelliM4 = new RangedWeapon({
	id: `00b5ce6e-ce91-4a68-856e-f72538af0261`,
	name: `Benelli M4`,
	sz: 4,
	dmg: 4,
	rng: 15,
	attr: [
		TwoHanded,
		Rapid,
		Scatter,
	],
	cap: 6,
	cal: `12g`
})

export default BenelliM4