import Ability from './Ability'


const Sidestep = new Ability({
	name: `Side-step`,
	desc: [
		`Free Dodge Action once per round.`,
	],
	max: 1,
	xp: 12
})

export default Sidestep