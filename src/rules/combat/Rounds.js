import Combat from '/src/classes/Combat.js'

const Rounds = new Combat({
	name: `Rounds`,
	description: [
		`During time-critical situations such as combat, Character Actions take place in 3-second “Rounds”.`,
		`Players have 60 seconds to allocate their Character's Actions for the Round.`,
		`Any unallocated Actions may be used as active Defense rolls, provided that the Character has enough Endurance to spend on those rolls.`,
		`All consequences of things that happened during a Round go into effect at the end of the Round.`,
	],
})

export default Rounds
