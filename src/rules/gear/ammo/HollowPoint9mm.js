import Ammo from '/src/classes/gear/Ammo.js'

const HollowPoint9mm = new Ammo({
	accuracy: 0,
	attributes: [],
	caliber: `9mm`,
	description: [`Self-defense ammunition.`],
	damage: 1,
	name: `9mm Hollow Point`,
	penetration: -1,
	size: 0.01,
	type: `Ammo`,
})

export default HollowPoint9mm
