import CreationStep from '$classes/CreationStep.js'
import Age from '$rules/description/Age.js'
import Hair from '$rules/description/Hair.js'
import Height from '$rules/description/Height.js'
import Name from '$rules/description/Name.js'
import Player from '$rules/description/Player.js'
import Sex from '$rules/description/Sex.js'
import Skin from '$rules/description/Skin.js'
import Weight from '$rules/description/Weight.js'

const Description = new CreationStep({
	name: `Description`,
	description: [`These are your characters physical and demographic characteristics.`],
	step: 6,
	type: `CreationStep`,
})
Description.list = [ Player, Name, Age, Sex, Height, Weight, Skin, Hair]

export default Description
