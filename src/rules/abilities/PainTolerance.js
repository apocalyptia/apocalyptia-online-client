import Ability from '$classes/Ability.js'

const PainTolerance = new Ability({
	name: `Pain Tolerance`,
	description: [`Ignore 1 Pain penalty.`],
	max: 3,
	experience: 9,
})

export default PainTolerance
