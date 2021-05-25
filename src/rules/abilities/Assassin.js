import Ability from '../../classes/Ability.js' 

const Assassin = new Ability({
	name: `Assassin`,
	desc: [
		`+3 Damage for Attacks made while Concealed.`,
	],
	max: 1,
	experience: 18
})

export default Assassin