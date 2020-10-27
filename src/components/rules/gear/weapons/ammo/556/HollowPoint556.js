import Gear from 'gear/Gear.js'
import HollowPoint from 'attributes/HollowPoint.js'

const HollowPoint556 = new Gear({
	id: `f6f0b22f-df8c-4604-ae1e-1f381ea60e4a`,
	name: `5.56mm Hollow Point`,
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