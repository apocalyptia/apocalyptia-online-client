import Ability from '/src/classes/Ability.js'
import Traits from '../Traits.js'

const SelfImprovement = new Ability({
	name: `Self Improvement`,
	desc: [`+1 to a Trait (max 6).`],
	max: 1,
	experience: 30,
	options: Object.values(Traits).map((s) => s.name)
})

export default SelfImprovement
