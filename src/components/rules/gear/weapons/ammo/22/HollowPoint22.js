import Gear from 'classes/Gear.js'
import HollowPoint from 'attributes/HollowPoint.js'

const HollowPoint22 = new Gear({
	name: `.22 Hollow Point`,
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