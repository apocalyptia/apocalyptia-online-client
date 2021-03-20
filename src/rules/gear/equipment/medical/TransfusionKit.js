import Gear from '/src/classes/Gear.js'

const TransfusionKit = new Gear({
	id: ``,
	name: `Transfusion Kit`,
	type: `Medical`,
	desc: [
		`Medicine 9#.`,
		`Inflict 1 Bleeding Damage on the donor to heal 1 Bleeding Damage on the recipient.`,
		`Takes 1hr.`,
	],
	sz: 2
})

export default TransfusionKit