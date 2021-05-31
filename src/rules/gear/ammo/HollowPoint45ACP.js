import Ammo from '/src/classes/gear/Ammo.js'
import HollowPoint from '../attributes/HollowPoint.js'

const HollowPoint45ACP = new Ammo({
	name: `.45ACP Hollow Point`,
	type: `Ammo`,
	desc: [`Self-defense ammunition.`],
	sz: 0.01,
	attr: [HollowPoint]
})
HollowPoint45ACP.cal = `.45ACP`

export default HollowPoint45ACP
