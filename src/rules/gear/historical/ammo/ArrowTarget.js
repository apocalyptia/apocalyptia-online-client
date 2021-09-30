import Ammo from '/src/classes/gear/Ammo.js'

const ArrowTarget = new Ammo({
	accuracy: 1,
	caliber: `Arrow`,
	description: [`Practice arrow.`],
	damage: 0,
	name: `Target Arrow`,
	penetration: 0,
	size: 0.1,
	type: `Ammo`,
})

export default ArrowTarget
