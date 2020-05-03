import Accessory from '../../../../classes/gear/weapons/Accessory'


const Bayonet = new Accessory({
	name: `Bayonet`,
	desc: [
		`Counts as a Knife.`,
		`+1 Damage and Pierce for Melee Attacks.`,
	],
	sz: 1
})

export default Bayonet