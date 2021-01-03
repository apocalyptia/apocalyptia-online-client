import Rule from 'classes/Rule.js'

const Unarmed = new Rule({
	name: `Unarmed`,
	desc: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
		`Damage Resistance is not depleted.`,
	],
	type: `Status`
})

export default Unarmed