import Ammo from '/src/classes/gear/Ammo.js'

const HollowPoint762mm = new Ammo({
	accuracy: 0,
	attributes: [],
	caliber: `7.62mm`,
	description: [`Self-defense ammunition.`],
	damage: 1,
	name: `7.62mm Hollow Point`,
	penetration: -1,
	size: 0.02,
	type: `Ammo`,
})

export default HollowPoint762mm
