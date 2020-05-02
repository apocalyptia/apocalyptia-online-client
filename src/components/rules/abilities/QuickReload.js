import Ability from '../../classes/Ability'


const QuickReload = new Ability({
	name: `Quick Reload`,
	desc: [
		`Free Reload once per round.`,
	],
	max: 1,
	xp: 3
})

export default QuickReload