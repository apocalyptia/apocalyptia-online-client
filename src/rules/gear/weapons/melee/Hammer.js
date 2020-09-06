import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Blunt from '../../attributes/weapon/Blunt'


const Hammer = new MeleeWeapon({
	id: `76f801f0-72e6-4b92-ab5a-61d8728da9dc`,
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