import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Chop from '../../attributes/weapon/Chop'


const Hatchet = new MeleeWeapon({
	id: `fcb3667d-44e2-4faf-b404-1aa9e0c0af09`,
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