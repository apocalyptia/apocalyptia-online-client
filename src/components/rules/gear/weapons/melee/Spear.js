import Gear from 'classes/Gear.js'
import OneHanded from 'attributes/OneHanded.js'
import Pierce from 'attributes/Pierce.js'

const Spear = new Gear({
	id: `d6b2d895-68be-4489-86bb-a80a13997e1d`,
	name: `Spear`,
	sz: 3,
	attr: [
		OneHanded,
		Pierce,
	]
})
Spear.dmg = 4
Spear.rng = 3

export default Spear