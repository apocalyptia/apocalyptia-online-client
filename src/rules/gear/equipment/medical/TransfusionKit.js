import Medical from './Medical'


const TransfusionKit = new Medical({
	id: `4cccec0d-4732-4421-dec9-12fd84a54611`,
	name: `Transfusion Kit`,
	desc: [
		`Medicine 9#.`,
		`Inflict 1 Bleeding Damage on the donor to heal 1 Bleeding Damage on the recipient.`,
		`Takes 1hr.`,
	],
	sz: 1
})

export default TransfusionKit