import Ability from '../../classes/Ability'
import Traits from '../Traits'


const SelfImprovement = new Ability({
	name: `Self Improvement`,
	desc: [
		`+1 to a Trait (max 6).`,
	],
	max: 1,
	xp: 30,
	opts: Traits.list
})

export default SelfImprovement