import Gear from '../../../classes/Gear.js' 

const Bandage = new Gear({
	name: `Bandage`,
	type: `Medical`,
	desc: [
		`+1 Medicine(First-Aid).`,
		`1 use.`,
	],
	sz: 0
})

export default Bandage