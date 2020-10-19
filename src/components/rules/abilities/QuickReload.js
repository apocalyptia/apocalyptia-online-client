import Ability from 'rules/abilities/Ability.js'


const QuickReload = new Ability({
	id: `5ec7eba9-31dc-49a5-88dc-75f1d1b22490`,
	name: `Quick Reload`,
	desc: [
		`Free Reload once per round.`,
	],
	max: 1,
	xp: 3
})

export default QuickReload