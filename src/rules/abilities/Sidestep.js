import Ability from '$classes/Ability.js'

const Sidestep = new Ability({
	name: `Sidestep`,
	description: [`Free Dodge Action once per Round.`],
	max: 1,
	experience: 12,
})

export default Sidestep
