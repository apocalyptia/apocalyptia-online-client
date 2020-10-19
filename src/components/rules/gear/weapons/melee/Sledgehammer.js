import MeleeWeapon from 'gear/weapons/melee/MeleeWeapon.js'
import TwoHanded from 'gear/attributes/weapon/TwoHanded.js'
import Blunt from 'gear/attributes/weapon/Blunt.js'
import Slow from 'gear/attributes/weapon/Slow.js'


const Sledgehammer = new MeleeWeapon({
	id: `746da84b-263b-4b41-90c4-a512014e86d7`,
	name: `Sledgehammer`,
	sz: 5,
	dmg: 4,
	rng: 2,
	attr: [
		TwoHanded,
		Blunt,
		Slow,
	]
})

export default Sledgehammer