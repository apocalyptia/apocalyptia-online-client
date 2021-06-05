import Maneuver from '/src/classes/Maneuver.js'

const Reload = new Maneuver({
	name: `Reload`,
	description: [`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Projectile weapon.`],
	mode: `Offensive`
})

export default Reload
