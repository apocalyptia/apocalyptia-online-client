import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint9mm = new Ammo({
	name: `9mm Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.01,
	attr: [HollowPoint]
})
HollowPoint9mm.cal = `9mm`

export default HollowPoint9mm
