import Ammo from '/src/classes/gear/Ammo.js'

const Standard22LR = new Ammo({
	accuracy: 0,
	caliber: `.22LR`,
	description: [`Basic ammunition.`],
	damage: 0,
	name: `.22LR Standard`,
	penetration: 0,
	size: 0.005,
	type: `Ammo`,
})

export default Standard22LR
