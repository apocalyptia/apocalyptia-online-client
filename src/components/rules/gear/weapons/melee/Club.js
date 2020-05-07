import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Blunt from '../../attributes/weapon/Blunt'


const Club = new MeleeWeapon({
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