import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'
import Chop from '../../attributes/weapon/Chop'


const Machete = new MeleeWeapon({
	id: `3e6a26a1-df4c-45db-acf0-a33f0948dc5f`,
	name: `Machete`,
	sz: 2,
	dmg: 3,
	rng: 2,
	attr: [
		OneHanded,
		Chop,
	]
})

export default Machete