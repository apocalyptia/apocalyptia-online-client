import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint22LR = new Ammo({
	name: `.22LR Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.005,
	attr: [HollowPoint]
})
HollowPoint22LR.cal = `.22LR`

export default HollowPoint22LR
