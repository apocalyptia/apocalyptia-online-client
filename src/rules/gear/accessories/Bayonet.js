import Accessory from '/src/classes/gear/Accessory.js'

const Bayonet = new Accessory({
	name: `Bayonet`,
	type: `Accessory`,
	desc: [`Counts as a Knife.`, `+1 Damage and Pierce for Melee Attacks.`],
	sz: 1
})

export default Bayonet
