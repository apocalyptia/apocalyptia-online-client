import Combat from '/src/classes/Combat.js'

const Round = new Combat({
	name: `Round`,
	description: [
		`During time-critical situations such as combat, Character Actions take place in 3-second Rounds on in-game time.`,
		`All Players allocate their Character's Actions for the Round simultaneously.`,
		`Any unallocated Actions may be used as Active Defense rolls, provided that the Character has enough Endurance to spend on those rolls.`,
		`All consequences of events that occur during a Round go into effect at the end of the Round.`,
	],
})

export default Round
