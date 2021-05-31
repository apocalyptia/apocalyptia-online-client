import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint308 = new Ammo({
	name: `.308 Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.02,
	attr: [HollowPoint]
})
HollowPoint308.cal = `.308`

export default HollowPoint308
