import Core from '/src/classes/Core.js'

const Difficulty = new Core({
	name: `Difficulty`,
	description: [
		`Difficulty numbers are used to objectively measure how hard it is to accomplish some task.`,
		`The Narrator determines what the Difficulty is to do things in the world, though many rules have suggested Difficulties listed already.`,
		`Difficulty numbers are indicated by the # symbol.`,
		`When the task is a contest of some kind against an adversary, the Results of both sides' rolls sets the Difficulty for each other (reroll ties).`,
		`3# = Easy`,
		`6# = Routine`,
		`9# = Challenging`,
		`12# = Hard`,
		`15# = Very Hard`,
		`18# = Extreme`,
	],
})

export default Difficulty
