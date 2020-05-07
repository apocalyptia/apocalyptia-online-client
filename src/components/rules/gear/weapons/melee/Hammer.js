import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Blunt from '../../attributes/weapon/Blunt'


const Hammer = new MeleeWeapon({
	name: `Hammer`,
	sz: 2,
	dmg: 2,
	rng: 1,
	attr: [
		OneHanded,
		Blunt,
	]
})

export default Hammer