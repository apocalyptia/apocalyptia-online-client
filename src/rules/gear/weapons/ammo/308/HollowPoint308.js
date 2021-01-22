import Gear from '$classes/Gear.js'
import HollowPoint from '$rules/gear/attributes/HollowPoint.js'

const HollowPoint308 = new Gear({
	id: ``,
	name: `.308 Hollow Point`,
	type: `Ammo`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	attr: [
		HollowPoint,
	]
})
HollowPoint308.cal = `.308`

export default HollowPoint308