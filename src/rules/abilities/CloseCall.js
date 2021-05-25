import Ability from '../../classes/Ability.js' 

const CloseCall = new Ability({
	name: `Close Call`,
	desc: [
		`Spend this Ability to survive an otherwise lethal encounter.`,
	],
	max: 1,
	experience: 30
})

export default CloseCall