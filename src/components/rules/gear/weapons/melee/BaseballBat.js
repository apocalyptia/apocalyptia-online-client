import MeleeWeapon from './MeleeWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Blunt from '../../attributes/weapon/Blunt'


const BaseballBat = new MeleeWeapon({
	id: `16a7ae03-024b-450b-9ce9-082b225f3021`,
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