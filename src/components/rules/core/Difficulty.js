import Rule from '../../classes/Rule'


const Difficulty = new Rule({
	name: `Difficulty`,
	desc: [
		`The Result of your roll must be greater than or equal to the Difficulty number to be a Success.`,
		`If the roll is opposed, re-roll ties.`,
		`Difficulties are indicated by the # symbol.`,
		`The Narrator or an opposing roll sets the # for your rolls.`,
		`3# = Trivial`,
		`6# = Routine`,
		`9# = Challenging`,
		`12# = Really Hard`,
		`15# = Very Unlikely`,
		`18# = Nearly Impossible`,
	]
})

export default Difficulty