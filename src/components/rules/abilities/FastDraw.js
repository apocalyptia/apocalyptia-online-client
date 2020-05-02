import Ability from '../../classes/Ability'


const FastDraw = new Ability({
	name: `Fast Draw`,
	desc: [
		`Free item draw once per round.`,
	],
	max: 1,
	xp: 6
})

export default FastDraw