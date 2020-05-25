import RangedWeapon from './RangedWeapon'
import TwoHanded from '../../attributes/weapon/TwoHanded'
import Rapid from '../../attributes/weapon/Rapid'


const SpringfieldM1A = new RangedWeapon({
	id: `ea8867ac-4563-425f-b999-1195cd6f350e`,
	name: `Springfield M1A`,
	sz: 4,
	dmg: 3,
	rng: 80,
	attr: [
		TwoHanded,
		Rapid,
	],
	cap: 20,
	cal: `.308`
})

export default SpringfieldM1A