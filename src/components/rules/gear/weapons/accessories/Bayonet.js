import Gear from 'classes/Gear.js'

const Bayonet = new Gear({
	name: `Bayonet`,
	desc: [
		`Counts as a Knife.`,
		`+1 Damage and Pierce for Melee Attacks.`,
	],
	sz: 1
})

export default Bayonet