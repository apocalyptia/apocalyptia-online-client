import Ability from '/src/classes/Ability.js'

const Ambidextrous = new Ability({
	name: `Ambidextrous`,
	description: [`Off-hand penalty is -1 instead of -3.`],
	max: 1,
	experience: 18,
})

export default Ambidextrous
