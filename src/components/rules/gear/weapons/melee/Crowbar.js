import MeleeWeapon from './MeleeWeapon'
import OneHanded from '../../attributes/weapon/OneHanded'


const Crowbar = new MeleeWeapon({
	name: `Crowbar`,
	sz: 3,
	dmg: 3,
	rng: 2,
	attr: [
		OneHanded,
	]
})

export default Crowbar