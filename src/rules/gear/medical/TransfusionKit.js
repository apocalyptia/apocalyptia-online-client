import Medical from '/src/classes/gear/Medical.js'

const TransfusionKit = new Medical({
	name: `Transfusion Kit`,
	type: `Medical`,
	description: [
		`Medicine 9#.`,
		`Inflict 1 Bleeding Damage on the donor to heal 1 Bleeding Damage on the recipient.`,
		`Takes 1hr.`
	],
	size: 2
})

export default TransfusionKit
