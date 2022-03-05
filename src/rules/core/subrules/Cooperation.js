import Core from '$classes/Core.js'

const Cooperation = new Core({
	name: `Cooperation`,
	description: [
		`If Characters want to help each other perform a task, one of them acts as the leader and makes the roll, while the rest add their scores together as a Modifier to the leader's roll.`,
		`Adding your score as a modifier to the leader's roll requires that you contribute the same amount of time as everyone else participating in completing the task.`,
		`The Narrator should use their judgement to determine reasonable limits on how many Characters can effectively participate, and by how much these helpers might assist in completing the task more quickly than normal.`,
	],
})

export default Cooperation
