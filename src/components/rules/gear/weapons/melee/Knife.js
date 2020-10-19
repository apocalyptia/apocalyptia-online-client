import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import OneHanded from 'gear/attributes/weapon/OneHanded.js'
import Pierce from 'gear/attributes/weapon/Pierce.js'
import Rapid from 'gear/attributes/weapon/Rapid.js'


const Knife = new MeleeWeapon({
	id: `077adc37-a0e4-4282-8641-74c648c8f5cd`,
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