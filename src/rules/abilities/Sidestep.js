import Ability from '/src/classes/Ability.js'

const Sidestep = new Ability({
	name: `Sidestep`,
	desc: [`Free Dodge Action once per round.`],
	max: 1,
	experience: 12
})

export default Sidestep
