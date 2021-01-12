import Gear from 'classes/Gear.js'
import HollowPoint from 'rules/gear/attributes/HollowPoint.js'

const HollowPoint45 = new Gear({
	id: ``,
	name: `.45 Hollow Point`,
	type: `Ammo`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	attr: [
		HollowPoint,
	]
})
HollowPoint45.cal = `.45`

export default HollowPoint45