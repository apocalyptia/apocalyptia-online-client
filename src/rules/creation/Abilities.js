import CreationStep from '/src/classes/CreationStep.js'

const Abilities = new CreationStep({
	name: `Abilities`,
	description: [`Abilities are special bonuses, knowledge, or techniques that can be purchased with Experience.`],
	step: 3,
	type: `CreationStep`,
})

export default Abilities
