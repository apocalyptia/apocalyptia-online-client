import Ability from 'classes/Ability.js'
import TraitsList from 'lists/TraitsList.js'

const SelfImprovement = new Ability({
	name: `Self Improvement`,
	desc: [
		`+1 to a Trait (max 6).`,
	],
	max: 1,
	xp: 30,
	opts: TraitsList.list
})

export default SelfImprovement