import Ability from 'classes/Ability.js'

const TacticalReload = new Ability({
	name: `Tactical Reload`,
	desc: [
		`Free Reload once per round.`,
	],
	max: 1,
	xp: 3
})

export default TacticalReload