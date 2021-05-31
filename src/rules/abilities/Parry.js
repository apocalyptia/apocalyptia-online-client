import Ability from '/src/classes/Ability.js'

const Parry = new Ability({
	name: `Parry`,
	desc: [`Free Block Action once per Round.`],
	max: 1,
	experience: 12
})

export default Parry
