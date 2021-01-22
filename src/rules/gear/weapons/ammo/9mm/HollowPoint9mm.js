import Gear from '$classes/Gear.js'
import HollowPoint from '$rules/gear/attributes/HollowPoint.js'

const HollowPoint9mm = new Gear({
	id: ``,
	name: `9mm Hollow Point`,
	type: `Ammo`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	attr: [
		HollowPoint,
	]
})
HollowPoint9mm.cal = `9mm`

export default HollowPoint9mm