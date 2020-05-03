import Bomb from '../../../../classes/gear/weapons/Bomb'
import Blast from '../../attributes/weapon/Blast'
import FireDamage from '../../attributes/weapon/FireDamage'


const Thermite = new Bomb({
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