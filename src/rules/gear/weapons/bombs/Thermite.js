import Gear from '$classes/Gear.js'
import Blast from '$rules/gear/attributes/Blast.js'
import FireDamage from '$rules/gear/attributes/FireDamage.js'

const Thermite = new Gear({
	id: ``,
	name: `Thermite`,
	type: `Bomb`,
	desc: [
		`High-temperature incendiary bomb.`,
	],
	sz: 1,
	attr: [
		Blast,
		FireDamage,
	]
})
Thermite.dmg = `6d6`
Thermite.rng = 1
Thermite.fuse = 2
Thermite.dur = 6
Thermite.mix = 6

export default Thermite