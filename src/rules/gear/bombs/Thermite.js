import Bomb from '/src/classes/gear/Bomb.js'
import Blast from '../attributes/Blast.js'
import FireDamage from '../attributes/FireDamage.js'

const Thermite = new Bomb({
	name: `Thermite`,
	type: `Bomb`,
	desc: [`High-temperature incendiary bomb.`],
	sz: 1,
	attr: [Blast, FireDamage]
})
Thermite.dmg = `6d6`
Thermite.rng = 1
Thermite.fuse = 2
Thermite.dur = 6
Thermite.mix = 6

export default Thermite
