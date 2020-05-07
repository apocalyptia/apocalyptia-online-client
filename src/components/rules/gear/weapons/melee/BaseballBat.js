import MeleeWeapon from './MeleeWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Blunt from '../../attributes/weapon/Blunt'


const BaseballBat = new MeleeWeapon({
	name: `Baseball Bat`,
	sz: 3,
	dmg: 3,
	rng: 2,
	attr: [
		TwoHanded,
		Blunt,
	]
})

export default BaseballBat