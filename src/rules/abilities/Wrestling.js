import Ability from '/src/classes/Ability.js'

const Wrestling = new Ability({
	name: `Wrestling`,
	description: [`Free Grapple Action once per Round.`],
	max: 1,
	experience: 12
})

export default Wrestling
