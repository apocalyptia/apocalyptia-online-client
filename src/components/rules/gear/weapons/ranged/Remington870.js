import RangedWeapon from 'gear/weapons/ranged/RangedWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Scatter from 'gear/attributes/weapon/Scatter.js'


const Remington870 = new RangedWeapon({
	id: `6398a22b-e4a9-4c9f-a984-3bf6aaa09146`,
	name: `Remington 870`,
	sz: 4,
	dmg: 4,
	rng: 15,
	attr: [
		TwoHanded,
		Scatter,
	],
	cap: 6,
	cal: `12g`
})

export default Remington870