import Maneuver from '/src/classes/Maneuver.js'

const Reload = new Maneuver({
	name: `Reload`,
	desc: [`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Projectile weapon.`],
	type: `Offensive`
})

export default Reload
