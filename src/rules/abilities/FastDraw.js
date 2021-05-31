import Ability from '/src/classes/Ability.js'

const FastDraw = new Ability({
	name: `Fast Draw`,
	desc: [`Free item draw once per round.`],
	max: 1,
	experience: 6
})

export default FastDraw
