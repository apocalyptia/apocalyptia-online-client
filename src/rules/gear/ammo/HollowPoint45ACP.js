import Ammo from '$classes/gear/Ammo.js'

const HollowPoint45ACP = new Ammo({
	accuracy: 0,
	attributes: [],
	caliber: `.45ACP`,
	description: [`Self-defense ammunition.`],
	damage: 1,
	name: `.45ACP Hollow Point`,
	penetration: -1,
	size: 0.01,
	type: `Ammo`,
})

export default HollowPoint45ACP
