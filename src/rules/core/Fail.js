import Rule from '$classes/Rule.js'

const Fail = new Rule({
	name: `Fail`,
	desc: [
		`Your roll is a Fail when the Result is less than the Difficulty.`,
	]
})

export default Fail