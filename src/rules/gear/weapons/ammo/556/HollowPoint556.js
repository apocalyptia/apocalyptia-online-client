import Gear from 'classes/Gear.js'
import HollowPoint from 'rules/gear/attributes/HollowPoint.js'

const HollowPoint556 = new Gear({
	name: `5.56mm Hollow Point`,
	type: `Ammo`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	attr: [
		HollowPoint,
	]
})
HollowPoint556.cal = `5.56`

export default HollowPoint556