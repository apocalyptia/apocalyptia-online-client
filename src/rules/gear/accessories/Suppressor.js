import Accessory from '/src/classes/gear/Accessory.js'

const Suppressor = new Accessory({
	name: `Suppressor`,
	type: `Accessory`,
	description: [`Firing a Gun does not break Concealment.`],
	size: 1,
})

export default Suppressor
