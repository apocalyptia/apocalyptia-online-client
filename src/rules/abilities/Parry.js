import Ability from '$classes/Ability.js'

const Parry = new Ability({
	name: `Parry`,
	description: [`Free Block Action once per Round.`],
	max: 1,
	experience: 12,
})

export default Parry
