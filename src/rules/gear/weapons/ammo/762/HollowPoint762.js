import Gear from '/src/classes/Gear.js'
import HollowPoint from '/src/rules/gear/attributes/HollowPoint.js'

const HollowPoint762 = new Gear({
	id: ``,
	name: `7.62mm Hollow Point`,
	type: `Ammo`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	attr: [
		HollowPoint,
	]
})
HollowPoint762.cal = `7.62`

export default HollowPoint762