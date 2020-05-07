import Bomb from './Bomb'
import Blast from '../../attributes/weapon/Blast'
import Pierce from '../../attributes/weapon/Pierce'


const FragGrenade = new Bomb({
	name: `Frag Grenade`,
	desc: [
		`Explosive fragmentation grenade.`,
	],
	sz: 1,
	dmg: `d6x3`,
	rng: `15yd`,
	attr: [
		Blast,
		Pierce,
	],
	fuse: `1 round`,
	dur: `instant`,
	mix: 9
})

export default FragGrenade