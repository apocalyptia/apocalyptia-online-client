import Gear from '/src/classes/Gear.js'

const Bayonet = new Gear({
	id: ``,
	name: `Bayonet`,
	type: `Accessory`,
	desc: [
		`Counts as a Knife.`,
		`+1 Damage and Pierce for Melee Attacks.`,
	],
	sz: 1
})

export default Bayonet