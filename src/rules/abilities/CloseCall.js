import Ability from '/src/classes/Ability.js'

const CloseCall = new Ability({
	name: `Close Call`,
	description: [`Spend this Ability to survive an otherwise lethal encounter.`],
	max: 1,
	experience: 30,
})

export default CloseCall
