import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Scatter from '../../attributes/weapon/Scatter'


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