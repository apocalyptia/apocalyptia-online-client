import Rule from '$classes/Rule.js'

const Bleeding = new Rule({
	name: `Bleeding`,
	desc: [
		`You begin Bleeding whenever you take Damage that isn't Blunt.`,
		`Bleeding Damage is dealt to the Torso, regardless of which Body Part took the initial Damage.`,
		`If your Torso has positive Health, the rate of Bleeding is 1 Damage per minute.`,
		`If any Body Part drops to 0 or negative Health, the rate of Bleeding is 1 Damage per round.`,
		`A Bleeding person with positive Torso Health can roll Constitution vs total Damage once per minute to stop Bleeding on their own, otherwise the Medicine Skill is required.`,
	],
	type: `Status`
})

export default Bleeding