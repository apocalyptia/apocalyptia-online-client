import Ammo from '/src/classes/gear/Ammo.js'

const HollowPoint22LR = new Ammo({
	accuracy: 0,
	attributes: [],
	caliber: `.22LR`,
	description: [`Self-defense ammunition.`],
	damage: 1,
	name: `.22LR Hollow Point`,
	penetration: -1,
	size: 0.005,
	type: `Ammo`,
})

export default HollowPoint22LR
