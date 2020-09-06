import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Blunt from '../../attributes/weapon/Blunt'


const Club = new MeleeWeapon({
	id: `5f8b0bd9-1b1c-4c44-9c31-e76db4f4a663`,
	name: `Club`,
	sz: 2,
	dmg: 2,
	rng: 2,
	attr: [
		OneHanded,
		Blunt,
	]
})

export default Club