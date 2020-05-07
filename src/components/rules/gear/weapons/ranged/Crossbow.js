import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'


const Crossbow = new RangedWeapon({
	name: `Crossbow`,
	sz: 3,
	dmg: 2,
	rng: 15,
	attr: [
		TwoHanded,
	],
	cap: 1,
	cal: `Arrow`
})

export default Crossbow