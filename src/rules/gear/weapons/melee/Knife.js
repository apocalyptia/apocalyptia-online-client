import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Pierce from '../../attributes/weapon/Pierce'
import Rapid from '../../attributes/weapon/Rapid'


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