import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint22 = new Ammo({
	name: `.22 Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.005,
	attr: [HollowPoint]
})
HollowPoint22.cal = `.22`

export default HollowPoint22
