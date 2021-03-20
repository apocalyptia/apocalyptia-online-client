import Gear from '/src/classes/Gear.js'
import HollowPoint from '/src/rules/gear/attributes/HollowPoint.js'

const HollowPoint22 = new Gear({
	id: ``,
	name: `.22 Hollow Point`,
	type: `Ammo`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: .005,
	attr: [
		HollowPoint,
	],
})
HollowPoint22.cal = `.22`

export default HollowPoint22