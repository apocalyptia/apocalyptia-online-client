import MeleeWeapon from './MeleeWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Blunt from '../../attributes/weapon/Blunt'


const Staff = new MeleeWeapon({
	name: `Staff`,
	sz: 3,
	dmg: 2,
	rng: 3,
	attr: [
		TwoHanded,
		Blunt,
	]
})

export default Staff