import Gear from 'classes/Gear.js'

const Bayonet = new Gear({
	id: `4e4e24f4-8b09-4a85-9170-df4e5125cec2`,
	name: `Bayonet`,
	desc: [
		`Counts as a Knife.`,
		`+1 Damage and Pierce for Melee Attacks.`,
	],
	sz: 1
})

export default Bayonet