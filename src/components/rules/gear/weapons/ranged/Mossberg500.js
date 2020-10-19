import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Scatter from 'gear/attributes/weapon/Scatter.js'


const Mossberg500 = new RangedWeapon({
	id: `6f193dc4-5a9e-4eb5-bdf6-59e0ca24c56a`,
	name: `Mossberg 500`,
	sz: 2,
	dmg: 4,
	rng: 10,
	attr: [
		TwoHanded,
		Scatter,
	],
	cap: 5,
	cal: `12g`
})

export default Mossberg500