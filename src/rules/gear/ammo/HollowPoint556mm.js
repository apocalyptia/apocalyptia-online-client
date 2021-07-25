import Ammo from '/src/classes/gear/Ammo.js'

const HollowPoint556mm = new Ammo({
	accuracy: 0,
	attributes: [],
	caliber: `5.56mm`,
	description: [`Self-defense ammunition.`],
	damage: 1,
	name: `5.56mm Hollow Point`,
	penetration: -1,
	size: 0.02,
	type: `Ammo`,
})

export default HollowPoint556mm
