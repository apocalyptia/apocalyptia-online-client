import Combat from '/src/classes/Combat.js'

const Rounds = new Combat({
	name: `Rounds`,
	desc: [
		`During time-critical situations such as combat, Character Actions take place in 3-second “Rounds”.`,
		`Players have 30 seconds to decide what their Character's Actions will be for the Round.`,
		`All consequences of things that happened during a Round go into effect at the start of the next Round.`
	]
})

export default Rounds
