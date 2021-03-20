import Rule from '/src/classes/Rule.js'

const Tame = new Rule({
	name: `Tame`,
	desc: [
		`Alter an animal’s Attitude by one step.`,
	],
	type: `Skill`
})
Tame.parent = `Demeanor`
Tame.diff = `Demeanor`
Tame.specs = {
	command: new Rule({
		id: `81e355cf-c841-4c88-802b-1d4c170ef741`,
		name: `Command`,
		desc: [
			`Animal obeys your command.`,
		]
	}),
	train: new Rule({
		id: `ee8cc929-151e-4f6c-abff-293379d5ee53`,
		name: `Train`,
		desc: [
			`(1wk) Animals learn commands = [its Brains x 2].`,
		]
	})
}

export default Tame