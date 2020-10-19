import Bomb from 'gear/weapons/bombs/Bomb.js'
import Blast from 'gear/attributes/weapon/Blast.js'
import FireDamage from 'gear/attributes/weapon/FireDamage.js'


const Thermite = new Bomb({
	id: `8d6aec56-bb21-4c12-a760-1dbb8d41e8cd`,
	name: `Thermite`,
	desc: [
		`High-temperature incendiary bomb.`,
	],
	sz: 1,
	dmg: `d6x6`,
	rng: `1yd`,
	attr: [
		Blast,
		FireDamage,
	],
	fuse: `1 round`,
	dur: `6 rounds`,
	mix: 6
})

export default Thermite