import Rule from '../../rules/Rule'


const Fail = new Rule({
	id: `4e7f6142-a2d0-43ac-cdd9-c1d3147dac69`,
	name: `Fail`,
	desc: [
		`Your roll is a Fail when the Result is less than the Difficulty.`,
	]
})

export default Fail