import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const CompoundBow = new RangedWeapon({
	name: `Compound Bow`,
	sz: 3,
	dmg: 1,
	rng: 15,
	attr: [
		TwoHanded,
	],
	cap: 1,
	cal: `Arrow`
})

export default CompoundBow