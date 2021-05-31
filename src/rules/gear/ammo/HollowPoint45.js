import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint45 = new Ammo({
	name: `.45 Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.01,
	attr: [HollowPoint]
})
HollowPoint45.cal = `.45`

export default HollowPoint45
