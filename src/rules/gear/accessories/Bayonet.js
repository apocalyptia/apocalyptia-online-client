import Accessory from '/src/classes/gear/Accessory.js'

const Bayonet = new Accessory({
	name: `Bayonet`,
	type: `Accessory`,
	description: [`Counts as a Knife.`, `+1 Damage and Pierce for Melee Attacks.`],
	size: 1,
})

export default Bayonet
