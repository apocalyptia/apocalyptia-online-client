import Gear from 'classes/Gear.js'
import HollowPoint from 'attributes/HollowPoint.js'

const HollowPoint762 = new Gear({
	id: `4770d5f6-df6f-49c8-8bf7-78d7d0db7584`,
	name: `7.62mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	attr: [
		HollowPoint,
	]
})
HollowPoint762.cal = `7.62`

export default HollowPoint762