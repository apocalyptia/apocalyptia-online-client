import RangedWeapon from '../../../../classes/gear/weapons/RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Scatter from '../../attributes/weapon/Scatter'


const Mossberg500 = new RangedWeapon({
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