import Bomb from 'gear/weapons/bombs/Bomb.js'
import Blast from 'gear/attributes/weapon/Blast.js'
import Pierce from 'gear/attributes/weapon/Pierce.js'


const FragGrenade = new Bomb({
	id: `e3a9114f-49c8-4984-89ff-54872d56ccda`,
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