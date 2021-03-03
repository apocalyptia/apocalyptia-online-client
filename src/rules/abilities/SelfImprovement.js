import Ability from 'classes/Ability.js'
import TraitsList from 'rules/lists/TraitsList.js'

const SelfImprovement = new Ability({
	id: ``,
	name: `Self Improvement`,
	desc: [
		`+1 to a Trait (max 6).`,
	],
	max: 1,
	experience: 30,
	opts: TraitsList.list
})

export default SelfImprovement