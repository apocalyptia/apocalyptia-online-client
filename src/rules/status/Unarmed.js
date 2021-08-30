import Status from '/src/classes/Status.js'

const Unarmed = new Status({
	name: `Unarmed`,
	description: [
		`Successful Unarmed Attacks do Damage = [( Attack - Defense ) / 2 ] (always Round down).`,
		`Absorption is not depleted.`
	],
	type: `Status`
})

export default Unarmed
