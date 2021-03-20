import Rule from '/src/classes/Rule.js'

const Unarmed = new Rule({
	name: `Unarmed`,
	desc: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
		`Absorption is not depleted.`,
	],
	type: `Status`
})

export default Unarmed