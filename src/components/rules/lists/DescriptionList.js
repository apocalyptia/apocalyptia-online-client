import Age from 'description/Age.js'
import Hair from 'description/Hair.js'
import Height from 'description/Height.js'
import Name from 'description/Name.js'
import Player from 'description/Player.js'
import Sex from 'description/Sex.js'
import Skin from 'description/Skin.js'
import Weight from 'description/Weight.js'

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