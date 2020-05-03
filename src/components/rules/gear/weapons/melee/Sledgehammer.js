import MeleeWeapon from '../../../../classes/gear/weapons/MeleeWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Blunt from '../../attributes/weapon/Blunt'
import Slow from '../../attributes/weapon/Slow'


const Sledgehammer = new MeleeWeapon({
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