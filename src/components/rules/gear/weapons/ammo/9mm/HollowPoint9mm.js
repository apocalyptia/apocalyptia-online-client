import Gear from 'gear/Gear.js'
import HollowPoint from 'attributes/HollowPoint.js'

const HollowPoint9mm = new Gear({
	id: `2ae93589-3bd7-4abf-a6a1-153bd1b4e7ed`,
	name: `9mm Hollow Point`,
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