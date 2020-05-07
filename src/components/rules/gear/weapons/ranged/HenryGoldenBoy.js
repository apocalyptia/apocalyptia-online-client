import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const HenryGoldenBoy = new RangedWeapon({
	name: `Henry Golden Boy`,
	sz: 3,
	dmg: 1,
	rng: 30,
	attr: [
		TwoHanded,
	],
	cap: 16,
	cal: `.357`
})

export default HenryGoldenBoy