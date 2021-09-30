import Gear from '$classes/Gear.js'
import OneHanded from '$rules/gear/attributes/OneHanded.js'

const ArmingSword = new Gear({
	id: ``,
	name: `Arming Sword`,
	type: `Melee Weapon`,
	sz: 2,
	attr: [
		OneHanded,
	]
})
ArmingSword.dmg = 3
ArmingSword.rng = 2

export default ArmingSword