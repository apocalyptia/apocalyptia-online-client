import Rule from '$classes/Rule.js'

const Rounds = new Rule({
	name: `Rounds`, 
	desc: [
		`Combat time occurs in 3-second “rounds”.`,
		`Players have 30 seconds to decide what their Character's Actions will be for the round.`,
		`Any new Complication or Status modifiers that come into play during a round go into effect at the start of the next round.`,
	]
})

export default Rounds