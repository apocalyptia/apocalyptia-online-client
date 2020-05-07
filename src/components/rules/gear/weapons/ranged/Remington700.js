import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const Remington700 = new RangedWeapon({
	name: `Remington 700`,
	sz: 4,
	dmg: 3,
	rng: 100,
	attr: [
		TwoHanded,
	],
	cap: 5,
	cal: `.308`
})

export default Remington700