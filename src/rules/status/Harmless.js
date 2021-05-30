import Rule from '../../classes/Rule.js'

const Harmless = new Rule({
	name: `Harmless`,
	desc: [`You cannot Attack.`],
	type: `Status`
})

export default Harmless
