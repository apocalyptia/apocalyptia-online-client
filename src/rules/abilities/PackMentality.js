import Ability from '$classes/Ability.js'

const PackMentality = new Ability({
	name: `Pack Mentality`,
	description: [`+1 Attack at a target a Comrade Attacks this Round.`],
	max: 1,
	experience: 3,
})

export default PackMentality
