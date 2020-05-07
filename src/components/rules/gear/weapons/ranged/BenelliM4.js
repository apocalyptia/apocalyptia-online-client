import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'
import Scatter from '../../attributes/weapon/Scatter'


const BenelliM4 = new RangedWeapon({
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