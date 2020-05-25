import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'


const RugerMkIII = new RangedWeapon({
	id: `739a925f-6d37-4e3f-a15d-af15248fbe1e`,
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