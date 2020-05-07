import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'


const RugerMkIII = new RangedWeapon({
	name: `Ruger Mk.III`,
	sz: 1,
	dmg: 1,
	rng: 15,
	attr: [
		TwoHanded,
		Rapid,
	],
	cap: 10,
	cal: `.22`
})

export default RugerMkIII