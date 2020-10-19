import Ability from 'rules/abilities/Ability.js'
import Traits from 'rules/traits/Traits.js'


const SelfImprovement = new Ability({
	id: `34bdd675-5a1c-4fe1-96d4-bac61572cf74`,
	name: `Self Improvement`,
	desc: [
		`+1 to a Trait (max 6).`,
	],
	max: 1,
	xp: 30,
	opts: Traits.list
})

export default SelfImprovement