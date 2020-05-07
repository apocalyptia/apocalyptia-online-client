import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Chop from '../../attributes/weapon/Chop'


const Hatchet = new MeleeWeapon({
	name: `Hatchet`,
	sz: 2,
	dmg: 2,
	rng: 1,
	attr: [
		OneHanded,
		Chop,
	]
})

export default Hatchet