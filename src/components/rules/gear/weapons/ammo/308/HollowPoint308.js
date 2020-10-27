import Gear from 'gear/Gear.js'
import HollowPoint from 'attributes/HollowPoint.js'

const HollowPoint308 = new Gear({
	id: `d9ef6e71-5f4c-4372-a1fb-70ad48637276`,
	name: `.308 Hollow Point`,
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