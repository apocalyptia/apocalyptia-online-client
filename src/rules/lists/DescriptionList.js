import Age from '$rules/description/Age.js'
import Hair from '$rules/description/Hair.js'
import Height from '$rules/description/Height.js'
import Name from '$rules/description/Name.js'
import Player from '$rules/description/Player.js'
import Sex from '$rules/description/Sex.js'
import Skin from '$rules/description/Skin.js'
import Weight from '$rules/description/Weight.js'

export default {
	name: `Description`,
	list: [
		Player,
		Name,
		Age,
		Sex,
		Height,
		Weight,
		Skin,
		Hair,
	]
}