import Ability from '/src/classes/Ability.js'

const TacticalReload = new Ability({
	name: `Tactical Reload`,
	description: [`Free Reload once per Round.`],
	max: 1,
	experience: 3
})

export default TacticalReload
