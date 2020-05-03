import Rule from '../../classes/Rule'


const Bleeding = new Rule({
	name: `Bleeding`, 
	desc: [
		`Whenever you get a new Wound, you begin taking an additional 1 Damage per minute to the Torso.`,
		`Bleeding Damage can only heal from natural Recovery or from a blood donation using a Transfusion Kit.`,
		`Roll Medicine(First-Aid) vs Damage to stop a Wound from Bleeding.`,
	]
})

export default Bleeding