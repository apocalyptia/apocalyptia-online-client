import Ammo from '/src/classes/gear/Ammo.js'

const Standard45ACP = new Ammo({
	accuracy: 0,
	caliber: `.45ACP`,
	description: [`Basic ammunition.`],
	damage: 0,
	name: `.45ACP Standard`,
	penetration: 0,
	size: 0.01,
	type: `Ammo`
})

export default Standard45ACP
