import Ability from '/src/classes/Ability.js'

const Healthy = new Ability({
	name: `Healthy`,
	description: [`+1 Health for each Body Part.`],
	max: 3,
	experience: 24,
})

export default Healthy
