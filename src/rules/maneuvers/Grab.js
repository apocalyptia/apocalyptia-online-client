import Rule from '../../classes/Rule.js'

const Grab = new Rule({
	name: `Grab`,
	desc: [`Roll [Melee(Unarmed) vs DEF] to impose the 'Grabbed' Status.`],
	type: `Offensive`
})

export default Grab
