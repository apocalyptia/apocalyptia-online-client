import Gear from '../../../classes/Gear.js' 

const Purse = new Gear({
	name: `Purse`,
	desc: [
		`1 round to access.`,
	],
	sz: 1
})
Purse.slots = 3

export default Purse