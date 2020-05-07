import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Chop from '../../attributes/weapon/Chop'


const Machete = new MeleeWeapon({
	name: `Machete`,
	sz: 2,
	dmg: 3,
	rng: 2,
	attr: [
		OneHanded,
		Chop,
	]
})

export default Machete