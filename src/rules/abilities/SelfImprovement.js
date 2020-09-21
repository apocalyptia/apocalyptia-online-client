import Ability from './Ability'
import Traits from '../traits/Traits'


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