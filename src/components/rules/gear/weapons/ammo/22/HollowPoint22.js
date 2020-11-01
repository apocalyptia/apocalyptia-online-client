import Gear from 'classes/Gear.js'
import HollowPoint from 'attributes/HollowPoint.js'

const HollowPoint22 = new Gear({
	id: `af1d4448-b795-4340-b1d6-2eeb601eeea7`,
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