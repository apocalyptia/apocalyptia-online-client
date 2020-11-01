import Gear from 'classes/Gear.js'
import Blast from 'attributes/Blast.js'
import FireDamage from 'attributes/FireDamage.js'

const Thermite = new Gear({
	id: `8d6aec56-bb21-4c12-a760-1dbb8d41e8cd`,
	name: `Thermite`,
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