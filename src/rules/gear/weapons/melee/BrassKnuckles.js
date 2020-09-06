import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Blunt from '../../attributes/weapon/Blunt'


const BrassKnuckles = new MeleeWeapon({
	id: `eaf2a5df-a818-4ec7-bace-25a303895fd8`,
	name: `Brass Knuckles`,
	sz: 1,
	dmg: 1,
	rng: 1,
	attr: [
		OneHanded,
		Blunt,
	]
})

export default BrassKnuckles