import Rule from 'rules/Rule.js'

const Unarmed = new Rule({
	id: `f37ac524-e26b-49b0-a3e7-5d01a50c5693`,
	name: `Unarmed`,
	desc: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
		`Damage Resistance is not depleted.`,
	]
})

export default Unarmed