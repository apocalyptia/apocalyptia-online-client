import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint357 = new Ammo({
	name: `.357 Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.01,
	attr: [HollowPoint]
})
HollowPoint357.cal = `.357`

export default HollowPoint357
