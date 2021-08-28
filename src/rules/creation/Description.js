import CreationStep from '/src/classes/CreationStep.js'
import Age from '/src/rules/description/Age.js'
import Hair from '/src/rules/description/Hair.js'
import Height from '/src/rules/description/Height.js'
import Name from '/src/rules/description/Name.js'
import Player from '/src/rules/description/Player.js'
import Sex from '/src/rules/description/Sex.js'
import Skin from '/src/rules/description/Skin.js'
import Weight from '/src/rules/description/Weight.js'

const Description = new CreationStep({
	name: `Description`,
	description: [`These are your characters physical and demographic characteristics.`],
	step: 5,
	type: `CreationStep`,
})
Description.list = [Player, Name, Age, Sex, Height, Weight, Skin, Hair]

export default Description
