import Melee from '/src/classes/gear/Melee.js'
import OneHanded from '../attributes/OneHanded.js'

const Crowbar = new Melee({
	name: `Crowbar`,
	type: `Melee Weapon`,
	sz: 3,
	attr: [OneHanded]
})
Crowbar.dmg = 3
Crowbar.rng = 2

export default Crowbar
