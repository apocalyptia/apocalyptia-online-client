import Ability from '/src/classes/Ability.js'
import Traits from '../Traits.js'

const SelfImprovement = new Ability({
	name: `Self Improvement`,
	description: [`+1 to a Trait (max 6).`],
	max: 1,
	experience: 30,
	options: [...Object.values(Traits).map((trait) => trait.name)],
})

export default SelfImprovement
