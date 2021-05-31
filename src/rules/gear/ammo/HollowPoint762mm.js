import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint762mm = new Ammo({
	name: `7.62mm Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.02,
	attr: [HollowPoint]
})
HollowPoint762mm.cal = `7.62mm`

export default HollowPoint762mm
