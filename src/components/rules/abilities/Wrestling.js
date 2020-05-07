import Ability from './Ability'


const Wrestling = new Ability({
	name: `Wrestling`,
	desc: [
		`Free Grapple Action once per round.`,
	],
	max: 1,
	xp: 12
})

export default Wrestling