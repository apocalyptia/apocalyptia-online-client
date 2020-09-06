import MeleeWeapon from './MeleeWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Blunt from '../../attributes/weapon/Blunt'
import Slow from '../../attributes/weapon/Slow'


const Sledgehammer = new MeleeWeapon({
	id: `746da84b-263b-4b41-90c4-a512014e86d7`,
	name: `Sledgehammer`,
	sz: 5,
	dmg: 4,
	rng: 2,
	attr: [
		TwoHanded,
		Blunt,
		Slow,
	]
})

export default Sledgehammer