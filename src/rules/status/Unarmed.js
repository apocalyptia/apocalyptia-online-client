import Status from '/src/classes/Status.js'

const Unarmed = new Status({
	name: `Unarmed`,
	desc: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
		`Absorption is not depleted.`
	],
	type: `Status`
})

export default Unarmed
