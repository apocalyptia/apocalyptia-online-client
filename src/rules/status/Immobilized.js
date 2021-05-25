import Rule from '../../classes/Rule.js' 

const Immobilized = new Rule({
	name: `Immobilized`,
	desc: [
		`Your Speed is temporarily considered to be 0.`
	],
	type: `Status`
})

export default Immobilized