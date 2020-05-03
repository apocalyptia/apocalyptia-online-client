import MeleeWeapon from '../../../../classes/gear/weapons/MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Pierce from '../../attributes/weapon/Pierce'
import Rapid from '../../attributes/weapon/Rapid'


const Knife = new MeleeWeapon({
	name: `Knife`,
	sz: 1,
	dmg: 1,
	rng: 1,
	attr: [
		OneHanded,
		Pierce,
		Rapid,
	]
})

export default Knife