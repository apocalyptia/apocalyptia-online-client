import Gear from 'gear/Gear.js'
import Blast from 'attributes/Blast.js'
import Pierce from 'attributes/Pierce.js'

const FragGrenade = new Gear({
	id: `e3a9114f-49c8-4984-89ff-54872d56ccda`,
	name: `Frag Grenade`,
	desc: [
		`Explosive fragmentation grenade.`,
	],
	sz: 1,
	attr: [
		Blast,
		Pierce,
	]
})
FragGrenade.dmg = `3d6`
FragGrenade.rng = 15
FragGrenade.fuse = 2
FragGrenade.dur = 1
FragGrenade.mix = 9

export default FragGrenade