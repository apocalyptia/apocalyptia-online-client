import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Scatter from '../../attributes/weapon/Scatter'


const Remington870 = new RangedWeapon({
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