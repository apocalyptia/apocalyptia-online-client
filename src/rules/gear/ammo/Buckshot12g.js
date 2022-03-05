import Ammo from '$classes/gear/Ammo.js'
import Scatter from '../attributes/Scatter.js'

const Buckshot12g = new Ammo({
	accuracy: 0,
	attributes: [ Scatter],
	caliber: `12g`,
	description: [`Scatter-shot ammunition.`],
	damage: 0,
	name: `12g Buckshot`,
	penetration: 0,
	size: 0.05,
	type: `Ammo`,
})

export default Buckshot12g
