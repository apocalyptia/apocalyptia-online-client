import Gear from 'classes/Gear.js'
import HollowPoint from 'rules/gear/attributes/HollowPoint.js'

const HollowPoint357 = new Gear({
	name: `.357 Hollow Point`,
	type: `Ammo`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	attr: [
		HollowPoint,
	]
})
HollowPoint357.cal = `.357`

export default HollowPoint357