import Ability from '../../classes/Ability'


const Tough = new Ability({
	name: `Tough`,
	desc: [
		`+1 Health for each Location.`,
	],
	max: 3,
	xp: 24
})

export default Tough