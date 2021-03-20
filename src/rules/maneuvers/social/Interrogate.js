import Rule from '/src/classes/Rule.js'

const Interrogate = new Rule({
	name: `Interrogate`,
	desc: [
		`Roll [Leadership vs Demeanor] to get information out of a subject who does not want to help, but without resorting to violence.`,
		`Each roll takes d6 mins of conversation.`,
		`If the interrogator Succeeds, the subject gives up a fact (wittingly or unwittingly).`,
		`If the subject Succeeds, they become hardened against further questioning, imposing a -1 penalty on subsequent attempts.`,
		`After Fails = [Demeanor], the interrogator gives up or the subject cracks and tells everything they know.`,
	]
})

export default Interrogate