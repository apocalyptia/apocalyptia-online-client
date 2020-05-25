import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Pierce from '../../attributes/weapon/Pierce'


const Spear = new MeleeWeapon({
	id: `d6b2d895-68be-4489-86bb-a80a13997e1d`,
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