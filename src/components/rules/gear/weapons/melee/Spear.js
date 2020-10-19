import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import OneHanded from 'gear/attributes/weapon/OneHanded.js'
import Pierce from 'gear/attributes/weapon/Pierce.js'


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