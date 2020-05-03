import MeleeWeapon from '../../../../classes/gear/weapons/MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Pierce from '../../attributes/weapon/Pierce'


const Spear = new MeleeWeapon({
	name: `Spear`,
	sz: 3,
	dmg: 4,
	rng: 3,
	attr: [
		OneHanded,
		Pierce,
	]
})

export default Spear