import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'
import Scatter from '../../attributes/weapon/Scatter'


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