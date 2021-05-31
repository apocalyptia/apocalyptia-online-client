import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint556mm = new Ammo({
	name: `5.56mm Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.02,
	attr: [HollowPoint]
})
HollowPoint556mm.cal = `5.56mm`

export default HollowPoint556mm
