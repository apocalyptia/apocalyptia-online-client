import MeleeWeapon from './MeleeWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Chop from '../../attributes/weapon/Chop'
import Slow from '../../attributes/weapon/Slow'


const Ax = new MeleeWeapon({
	id: `a9aead5f-27f8-4727-84b0-6fdd536d52f8`,
	name: `Ax`,
	sz: 4,
	dmg: 4,
	rng: 2,
	attr: [
		TwoHanded,
		Chop,
		Slow,
	]
})

export default Ax